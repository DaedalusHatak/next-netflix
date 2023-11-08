"use client";
import { useState } from "react";
import BaseInput from "../../../_components/BaseInput/BaseInput";
import { useRouter } from "next/navigation";
export default function GetStartedForm() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError]: any = useState("");
  function handleClick() {
    if (inputValue.length < 6) {
      setError("Email is too short");
      return;
    }
    if (inputValue.indexOf("@") === -1) {
      setError("Invalid Email");
      return;
    }
    setError("");
  }
  async function handleSubmit(e: any) {
    e.preventDefault();
    await fetch("/api/setEmail", {
      method: "POST",
      body: JSON.stringify(inputValue),
    });
    router.push("/confirm");
  }
  return (
    <>
      <div className="get-started">
        <h3>
          Ready to watch? Enter your email to create or restart your membership.
        </h3>
        <form
          onSubmit={handleSubmit}
          action=""
        >
          <div className="input relative">
            <BaseInput
              name="Email Address"
              isBackground={true}
              type="email"
              fullWidth={true}
              complete="email"
              value={inputValue}
              error={error}
              onChange={(e: any) => setInputValue(e.target.value)}
              required
            ></BaseInput>
          </div>
          <button
            onClick={handleClick}
            className="get-started-button"
          >
            Get Started
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fillRule={"nonzero"}
              xmlns="http://www.w3.org/2000/svg"
              className="Hawkins-Icon Hawkins-Icon-Standard"
              data-name="ChevronRight"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.29297 19.2928L14.5859 12L7.29297 4.70706L8.70718 3.29285L16.7072 11.2928C16.8947 11.4804 17.0001 11.7347 17.0001 12C17.0001 12.2652 16.8947 12.5195 16.7072 12.7071L8.70718 20.7071L7.29297 19.2928Z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
        </form>
      </div>
    </>
  );
}
