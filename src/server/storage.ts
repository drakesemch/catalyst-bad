import { Blob, File } from "buffer";
import { UTApi } from "uploadthing/server";
import { env } from "@/env";

const utapi = new UTApi({
  apiKey: env.UPLOADTHING_SECRET,
});

async function addFiles(...files: { file: File; name: string }[]) {
  const responses = files.map(async (itm) => {
    new File([new Blob([await itm.file.arrayBuffer()])], itm.name);
    return await utapi.uploadFiles(itm.file);
  });
  return responses;
}

async function listFiles(start?: number, limit?: number) {
  return await utapi.listFiles({ offset: start ?? 0, limit: limit ?? 500 });
}

async function getFiles(...filenames: string[]) {
  let secondIter = false;
  if ((filenames.at(-1) as boolean | string) === true) {
    filenames.pop();
    secondIter = true;
  }
  const responses = await Promise.all(
    filenames.map(async (itm) => {
      const data = (await utapi.getFileUrls(itm)).at(0);
      return {
        ...data,
        content: (await fetch(data?.url ?? "")
          .then((res) => res.blob())
          .catch(async (_) => {
            if (secondIter) return new Blob([""]);
            (
              await getFiles(
                (await listFiles()).find((file) => file.key == itm)?.key ?? "",
                true as unknown as string,
              )
            ).at(0)?.content;
          })) as Blob,
      };
    }),
  );
  return responses;
}

async function renameFiles(...data: { key: string; renamedTo: string }[]) {
  const responses = data.map(async (itm) => {
    return await utapi.renameFiles({
      key: itm.key,
      newName: itm.renamedTo,
    });
  });
  return responses;
}

async function deleteFiles(...filenames: string[]) {
  const responses = filenames.map(async (itm) => {
    return await utapi.deleteFiles(itm);
  });
  return responses;
}

const storage = {
  addFiles,
  addFile: addFiles,
  listFiles,
  getFiles,
  getFile: getFiles,
  renameFiles,
  renameFile: renameFiles,
  deleteFiles,
  deleteFile: deleteFiles,
};

export { storage, utapi };
