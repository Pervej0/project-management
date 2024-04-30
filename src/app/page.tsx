/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from "next/image";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import { inter, roboto } from "@/assets/fonts";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

type Inputs = {
  email?: string;
  password?: string;
};

export default function Home() {
  const router = useRouter();
  const onSubmit = (data: Inputs) => {
    if (data) {
      toast("Successfully logged in.", { icon: "👏" });
      router.push("/dashboard");
    }
  };

  return (
    <main className="px-14">
      <Toaster />

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
          <Form
            name="normal_login"
            initialValues={{
              remember: true,
            }}
            onFinish={onSubmit}
            layout="vertical"
            requiredMark="optional"
          >
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  required: true,
                  message: "Please input your Email!",
                },
              ]}
            >
              <Input
                className="py-2 text-lg px-2 mb-2"
                prefix={<MailOutlined />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                className="py-2 text-lg px-2"
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: "0px" }}>
              <Button block={true} type="primary" htmlType="submit">
                Log in
              </Button>
              <div>
                <h5 className="text-sm mt-1">Don't have an account?</h5>{" "}
                <Link className="text-blue-600 font-semibold" href="/">
                  Sign up now
                </Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </main>
  );
}
