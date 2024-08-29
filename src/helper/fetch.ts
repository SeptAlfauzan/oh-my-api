export default class Fetch {
  static async postData<T>(
    url: string,
    data: any,
    option: any = {
      headers: {
        "Content-Type": "application/json",
      },
    }
  ): Promise<T> {
    try {
      let res;
      if (data != undefined) {
        res = await fetch(url, {
          method: "POST",
          headers: option.headers,
          body: JSON.stringify(data),
        });
      } else {
        res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
      if (!res.ok) {
        throw new Error(`Request error ${res.statusText}`);
      } else {
        const jsonResult = await res.json();
        return jsonResult.data as T;
      }
    } catch (error) {
      throw error;
    }
  }

  static async getData<T>(url: string, option: any = {}): Promise<T> {
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: option.headers,
      });

      if (!res.ok) {
        throw new Error(`Request error ${res.text}`);
      } else {
        const jsonResult = await res.json();
        return jsonResult.data as T;
      }
    } catch (error) {
      throw error;
    }
  }
}
