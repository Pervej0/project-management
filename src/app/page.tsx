"use client";

import Image from "next/image";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import { inter, roboto } from "@/assets/fonts";
import Link from "next/link";

type Inputs = {
  email?: string;
  password?: string;
};

export default function Home() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <main className="px-14">
      <div className="grid min-h-screen md:grid-cols-2 grid-cols-1 items-center">
        <Image
          src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg"
          alt="Log in image"
          height="400"
          width="500"
        />
        <div className="flex flex-col justify-center mx-16">
          <h1
            className={`${roboto.className} text-center uppercase md:text-3xl text-xl font-semibold mb-6`}
          >
            Log in to dashboard
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className="border-2 border-gray-800 rounded-md w-full mb-5 px-2 py-2"
              type="email"
              placeholder="Enter email"
              required
              {...register("email")}
            />

            <input
              className="border w-full mb-5 px-2 py-2"
              type="password"
              placeholder="Enter password"
              required
              {...register("password")}
            />
            <input
              className="bg-blue-600 px-4 py-2 rounded-md text-white"
              type="submit"
              value="Login"
            />
            <p className="text-center mt-4">
              Don&apos;t have an account?{" "}
              <Link className="text-accent text-blue-600" href="/register">
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
