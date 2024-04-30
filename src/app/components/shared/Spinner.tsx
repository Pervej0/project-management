import { Flex, Spin } from "antd";
import React from "react";

const Spinner = () => {
  return (
    <Flex justify="center" align="center" gap="middle">
      <Spin size="large" />
    </Flex>
  );
};

export default Spinner;
