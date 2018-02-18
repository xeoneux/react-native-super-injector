import React from "react";

export interface IInjectorProps extends React.Props<any> {
  defaultComponent?: React.ComponentType<any>;
  defaultProps?: object;
  injectant?: React.ComponentType<any>;
  injectantProps?: object;
}

export default class Injector extends React.Component<IInjectorProps> {
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
