/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
//@ts-nocheck

import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const hasTitle = searchParams.has("title");

    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "Resolute";

    const imageData = await fetch(
      new URL("http://localhost:3000/_next/image?url=%2Flogo.png&w=48&q=75"),
      import.meta.url
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
      (
        <div tw="flex flex-col w-full h-full items-center justify-center bg-white">
          <div tw="bg-gray-50 flex w-full">
            <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
              <h2 tw="flex flex-col text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 text-left">
                <div tw="flex justify-center items-center">
                  <img width={64} height={64} src={imageData} tw="mr-5"></img>
                  <div href="/" tw="flex md:flex-row flex-col">
                    <span>Ready to organise your work?</span>
                    <span tw="text-indigo-600">
                      Resolve this issue with Resolute.
                    </span>
                  </div>
                </div>
              </h2>
              <div tw="mt-8 flex md:mt-0">
                <div tw="flex rounded-md shadow">
                  <a
                    href="https://github.com/KawalaE/Resolute"
                    tw="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white"
                  >
                    Get started 🚀
                  </a>
                </div>
                <div tw="ml-3 flex rounded-md shadow">
                  <a tw="flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-indigo-600">
                    Learn more 📚
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        emoji: "twemoji",
      }
    );
  } catch (error: any) {
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
