import { useContext, useState } from "react";
import { AppContext } from "../App";

export default function CreateService() {
  const appContext = useContext(AppContext);

  const [data, setData] = useState({
    name: "",
    description: "",
    logo: "",
  });

  function handleChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch("http://localhost:3000/service", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    appContext.tellMessage("Service Created Successfully");

    appContext.navBack();
  }

  return (
    <div className="p-4">
      <h5 className="text-primary-brand mb-4">Create Service</h5>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            name="name"
            placeholder="Service Name"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <textarea
            name="description"
            placeholder="Description"
            className="form-control"
            rows="4"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="logo"
            placeholder="Logo URL"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn btnPrimary">Submit</button>
      </form>
    </div>
  );
}
