export default class Fetch {
  static async postData<T>(url: string, data: any): Promise<T> {
    try {
      let res;
      if (data != undefined) {
        res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
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
