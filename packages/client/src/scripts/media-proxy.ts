import { query } from "@/scripts/url";
import { url } from "@/config";

export function getProxiedImageUrl(imageUrl: string, type?: "preview" | "emoji" | "avatar" | "ticker" | "thumbnail", mustOrigin = false): string {
    const localProxy = `${url}/proxy`;
    let mustOriginStr = "0";
    if (mustOrigin) {
        mustOriginStr = "1";
    }

    if (imageUrl.startsWith("/proxy/") || imageUrl.startsWith(localProxy + "/")) {
        // もう既にproxyっぽそうだったらurlを取り出す
        imageUrl = (new URL(imageUrl)).searchParams.get("url") ?? imageUrl;
    }
    return `${url}/proxy/image.webp?${query({
        url: imageUrl,
        mustOrigin: mustOriginStr,
        ...(type ? { [type]: "1" } : {}),
    })}`;
}

export function getProxiedImageUrlNullable(imageUrl: string | null | undefined, type?: "preview" | "emoji" | "avatar" | "ticker"): string | null {
    if (imageUrl == null) return null;
    return getProxiedImageUrl(imageUrl, type);
}
