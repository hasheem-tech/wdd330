export const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  if (res.ok) {
    return res.json();
  }

  const error = await res.text();
  console.log("SERVER RESPONSE:", error);

  throw new Error(`Bad Response: ${res.status}`);
}

export default class ExternalServices {
  constructor() {

  }
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async findProductById(id, category) {
    const products = await this.getData(category);
    return products.find((item) => item.Id === id);
  }
  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(`${baseURL}checkout/`, options).then(convertToJson);
  }
}
