"use client";

import { ArrowRight, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { CircleCheck, CircleSlash } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  verifyURL,
  verifyToken,
  type ErrorURL,
  type ErrorToken,
  saveCanvasCredentials,
} from "./action";
import { Button } from "~/components/ui/button";
import { CardContent, CardFooter } from "~/components/ui/card";
import { useFormStatus } from "react-dom";

export default function CanvasOnboardingClientPage() {
  const [url, setURL] = useState("");
  const [token, setToken] = useState("");
  const [urlState, setUrlState] = useState<ErrorURL>({
    success: false,
    error: "EMPTY",
  });
  const [tokenState, setTokenState] = useState<ErrorToken>({
    success: false,
    error: "EMPTY",
  });
  const { pending } = useFormStatus();

  return (
    <>
      <form
        action={saveCanvasCredentials}
        onSubmit={() => console.log("SUBMITT")}
      >
        <CardContent>
          How to get a Canvas Token
          <p className="muted pt-2">
            Canvas Tokens are important to be able to use Catalyst and have
            direct access to Canvas without having to make custom
            implementations.
          </p>
          <ol className="list-decimal pl-8 !text-sm [&>li]:mt-2 [&>li]:leading-relaxed">
            <li>Go to your Canvas dashboard</li>
            <li>
              Copy the URL from the address bar
              <div className="flex gap-2">
                (e.x.
                <code className="snippet overflow-auto !text-xs">
                  https://canvas.instructure.com
                </code>
                )
              </div>
            </li>
            <li>
              <URLBox
                url={url}
                setURL={setURL}
                urlState={urlState}
                setUrlState={setUrlState}
              />
            </li>
            <li>
              Go to the <code className="snippet !text-xs">Account</code> item
              in the sidebar, and click on
              <code className="snippet !text-xs">Settings</code>
            </li>
            <li>
              Scroll to the bottom of the
              <code className="snippet !text-xs">Approved Integrations</code>
              section (above the
              <code className="snippet !text-xs">Feature Options</code> section)
            </li>
            <li>
              Click on the
              <code className="snippet inline-flex items-center gap-2 !text-xs">
                <Plus /> New Access Token
              </code>
              button
            </li>
            <li>
              Fill the form with the following information:
              <ul className="list-disc p-2 pl-8 !text-sm">
                <li>
                  Purpose: <code className="snippet !text-xs">Catalyst</code>
                </li>
                <li>
                  Expires: <code className="snippet !text-xs">Never</code>
                </li>
              </ul>
            </li>
            <li>
              Click on the{" "}
              <code className="snippet !text-xs">Generate Token</code>
              button
            </li>
            <li>
              Copy the token that was generated
              <div className="flex gap-2">
                (e.x.
                <code className="snippet overflow-auto !text-xs">
                  10968~R48fsV4K2Ttj83knxm3qw4CyNFpuE1ZrEhzmlL5dIkmAt1XnI8ulM3AyzxqkWowA
                </code>
                )
              </div>
            </li>
            <li>
              <TokenBox
                url={url}
                token={token}
                setToken={setToken}
                tokenState={tokenState}
                setTokenState={setTokenState}
              />
            </li>
          </ol>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            type="submit"
            disabled={
              pending ||
              !(urlState.success || urlState.error == "INVALID_PATH") ||
              !tokenState.success
            }
            className="flex gap-2"
          >
            Next <ArrowRight />
          </Button>
        </CardFooter>
      </form>
    </>
  );
}

function URLBox({
  url,
  setURL,
  urlState,
  setUrlState,
}: {
  url: string;
  setURL: (url: string) => void;
  urlState: ErrorURL;
  setUrlState: (result: ErrorURL) => void;
}) {
  return (
    <Label>
      Paste the URL here:
      <Input
        placeholder="https://canvas.instructure.com"
        variant="secondary"
        name="url"
        onInput={(evt) => {
          setTimeout(() => {
            const target = evt.target as HTMLInputElement;
            setURL(target.value);
            verifyURL(target.value)
              .then((result) => setUrlState(result))
              .catch((err) => new Error(err as string));
          });
        }}
      />
      <URLError url={url} urlState={urlState} />
    </Label>
  );
}

function URLError({
  url: inpURL,
  urlState,
}: {
  url: string;
  urlState: ErrorURL;
}) {
  if (urlState.success) {
    return (
      <p className="text-success flex gap-2">
        <CircleCheck /> Valid URL
      </p>
    );
  }
  switch (urlState.error) {
    case "EMPTY":
      return (
        <p className="flex gap-2 text-destructive">
          <CircleSlash /> URL cannot be empty
        </p>
      );
    case "INVALID_URL":
      return (
        <p className="flex gap-2 text-destructive">
          <CircleSlash /> Invalid URL
        </p>
      );
    case "INVALID_HOSTNAME":
      return (
        <p className="flex gap-2 text-destructive">
          <CircleSlash />
          URL must be from Canvas
        </p>
      );
    case "INVALID_PATH":
      const url = new URL(inpURL);
      url.pathname = "/";
      return (
        <div className="flex items-center gap-2 leading-normal">
          <CircleCheck />
          <div>
            Valid URL
            <div className="flex gap-1">
              Using the root URL:
              <code className="snippet !text-xs">{url.toString()}</code>
            </div>
          </div>
        </div>
      );
  }
}

function TokenBox({
  url,
  token,
  setToken,
  tokenState,
  setTokenState,
}: {
  url: string;
  token: string;
  setToken: (token: string) => void;
  tokenState: ErrorToken;
  setTokenState: (result: ErrorToken) => void;
}) {
  useEffect(() => {
    verifyToken(url, token)
      .then((result) => setTokenState(result))
      .catch((err) => new Error(err as string));
  }, [url]);
  return (
    <Label>
      Paste the token here:
      <Input
        placeholder="10968~R48fsV4K2Ttj83knxm3qw4CyNFpuE1ZrEhzmlL5dIkmAt1XnI8ulM3AyzxqkWowA"
        variant="secondary"
        name="token"
        onInput={(evt) => {
          setTimeout(() => {
            const target = evt.target as HTMLInputElement;
            setToken(target.value);
            verifyToken(url, target.value)
              .then((result) => setTokenState(result))
              .catch((err) => new Error(err as string));
          });
        }}
      />
      <TokenError tokenState={tokenState} />
    </Label>
  );
}

function TokenError({ tokenState }: { tokenState: ErrorToken }) {
  if (tokenState.success) {
    return (
      <p className="text-success flex gap-2">
        <CircleCheck /> Valid Token
      </p>
    );
  }
  switch (tokenState.error) {
    case "INVALID_URL":
      return (
        <p className="flex gap-2 text-destructive">
          <CircleSlash /> Please ensure that your URL is valid
        </p>
      );
    case "EMPTY":
      return (
        <p className="flex gap-2 text-destructive">
          <CircleSlash /> Token cannot be empty
        </p>
      );
    case "INVALID_TYPE":
      return (
        <p className="flex gap-2 text-destructive">
          <CircleSlash /> Your token does not match the expected format
        </p>
      );
    case "USED_EXAMPLE":
      return (
        <p className="flex gap-2 text-destructive">
          <CircleSlash /> Cannot use example token
        </p>
      );
    case "INVALID_TOKEN":
      return (
        <p className="flex gap-2 text-destructive">
          <CircleSlash /> Invalid Token
        </p>
      );
  }
}
