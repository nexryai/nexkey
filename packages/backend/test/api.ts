process.env.NODE_ENV = "test";

import * as assert from "assert";
import * as childProcess from "child_process";
import { async, signup, request, startServer, shutdownServer, post, simplePost } from "./utils.js";

describe("API", () => {
    let p: childProcess.ChildProcess;
    let alice: any;
    let bob: any;
    let carol: any;

    before(async () => {
        p = await startServer();
        alice = await signup({ username: "alice" });
        bob = await signup({ username: "bob" });
        carol = await signup({ username: "carol" });
    });

    after(async () => {
        await shutdownServer(p);
    });

    describe("General validation", () => {
        it("wrong type", async(async () => {
            const res = await request("/test", {
                required: true,
                string: 42,
            });
            assert.strictEqual(res.status, 400);
        }));

        it("脆弱なパスワードは登録できない", async(async () => {
            const res = await simplePost("/signup", {
                username: "unsafe",
                password: "12345",
            });
            assert.strictEqual(res.status, 400);
            assert.strictEqual(res.body, "UNSAFE_PASSWORD");
        }));

        it("missing require param", async(async () => {
            const res = await request("/test", {
                string: "a",
            });
            assert.strictEqual(res.status, 400);
        }));

        it("invalid misskey:id (empty string)", async(async () => {
            const res = await request("/test", {
                required: true,
                id: "",
            });
            assert.strictEqual(res.status, 400);
        }));

        it("valid misskey:id", async(async () => {
            const res = await request("/test", {
                required: true,
                id: "8wvhjghbxu",
            });
            assert.strictEqual(res.status, 200);
        }));

        it("default value", async(async () => {
            const res = await request("/test", {
                required: true,
                string: "a",
            });
            assert.strictEqual(res.status, 200);
            assert.strictEqual(res.body.default, "hello");
        }));

        it("can set null even if it has default value", async(async () => {
            const res = await request("/test", {
                required: true,
                nullableDefault: null,
            });
            assert.strictEqual(res.status, 200);
            assert.strictEqual(res.body.nullableDefault, null);
        }));

        it("cannot set undefined if it has default value", async(async () => {
            const res = await request("/test", {
                required: true,
                nullableDefault: undefined,
            });
            assert.strictEqual(res.status, 200);
            assert.strictEqual(res.body.nullableDefault, "hello");
        }));
    });
});
