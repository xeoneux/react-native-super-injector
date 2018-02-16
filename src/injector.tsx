import React from "react";
import { Component, ComponentClass, Props } from "react";

export interface IInjectorProps extends Props<any> {
  defaultComponent?: ComponentClass;
  defaultProps: object;
  injectant?: ComponentClass;
  injectantProps?: object;
}

export default class Injector extends Component<IInjectorProps> {
  private static renderDefault(props: IInjectorProps) {
    const DefaultComponent = props.defaultComponent!;
    const { defaultProps } = props;

    return (
      <DefaultComponent {...defaultProps}>{props.children}</DefaultComponent>
    );
  }

  private static renderInjectant(props: IInjectorProps) {
    const Injectant = props.injectant!;
    const { defaultProps, injectantProps } = props;

    return (
      <Injectant {...defaultProps} {...injectantProps}>
        {props.children}
      </Injectant>
    );
  }

  public render() {
    return this.props.injectant
      ? Injector.renderInjectant(this.props)
      : Injector.renderDefault(this.props);
  }
}
