import React from "react";
import { Component, Props } from "react";
import { Text, View } from "react-native";
import ReactTestRenderer from "react-test-renderer";

import Injector from "./injector";

const testProps = {
  selectable: true,
  style: { color: "red" },
};

const defaultTree = ReactTestRenderer.create(
  <Injector defaultProps={testProps} defaultComponent={Text}>
    Hello World
  </Injector>,
).toJSON()!;

test("Render default properly", () => {
  const defaultComponent = defaultTree;
  expect(defaultComponent.children![0]).toBe("Hello World");
  expect(defaultComponent.props.style.color).toBe("red");
});

const injectProps = {
  selectable: false,
  stubProp: true,
  style: { color: "black" },
};

class StubTextComponent extends Component<Props<any>> {
  public render() {
    return (
      <View>
        <Text {...this.props}>{this.props.children}</Text>
      </View>
    );
  }
}

const injectorTree = ReactTestRenderer.create(
  <Injector
    defaultComponent={Text}
    defaultProps={testProps}
    injectant={StubTextComponent}
    injectantProps={injectProps}
  >
    Hello World
  </Injector>,
).toJSON();

test("Render default properly", () => {
  const parent = injectorTree!;
  expect(parent.type).toBe("View");

  const nestedComponent = parent.children![0];
  expect(nestedComponent.type).toBe("Text");
  // Check to insure override of props
  expect(nestedComponent.props.selectable).toBeFalsy();
  expect(nestedComponent.props.style.color).toBe("black");

  const internalText = nestedComponent.children![0];
  expect(internalText).toBe("Hello World");
});

test("Render injector properly", () => {
  expect(injectorTree).toMatchSnapshot();
});
