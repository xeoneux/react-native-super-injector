import React, { Component, ComponentClass, Props, SFC } from "react";

export interface IInjectorProps extends Props<any> {
  defaultComponent?: ComponentClass<any> | SFC<any>;
  defaultProps?: object;
  injectant?: ComponentClass<any> | SFC<any>;
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
