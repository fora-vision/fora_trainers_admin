export class ForaApi {
    private session: string = "";
    private endpoint = "https://dev.fora.vision";

    public setAuthToken(session: string) {
        this.session = session;
    }

    private async fetch<T = any>(
        input: RequestInfo,
        init: RequestInit = {}
    ): Promise<T> {
        const auth = { Authorization: this.session };
        const res = await fetch(`${this.endpoint}/${input}`, {
            ...init,
            headers: Object.assign(auth, init.headers),
        });

        if (!res.ok) {
            throw Error(res.statusText);
        }

        return await res.json();
    }
}