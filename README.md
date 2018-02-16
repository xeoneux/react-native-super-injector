# react-native-super-injector
[![Travis Build Status](https://img.shields.io/travis/xeoneux/react-native-super-injector.svg?style=flat-square)](https://travis-ci.org/xeoneux/react-native-super-injector) [![David](https://img.shields.io/david/dev/xeoneux/react-native-super-injector.svg?style=flat-square)](https://david-dm.org/xeoneux/react-native-super-injector?type=dev) [![npm](https://img.shields.io/npm/dt/react-native-super-injector.svg?style=flat-square)](https://www.npmjs.com/package/react-native-super-injector)

> 💉 An "injectable" react-native component that allows an external component to be injected during run-time while falling back to a default component

### NOTE: This package is TypeScript version of  [react-native-injectable-component](https://github.com/brh55/react-native-injectable-component) by [Brandon Him](https://github.com/brh55)

##### What
The core of `react-native-super-injector` is rather small and simple. It's sole purpose is to simplify the need of passing along an external component to override the default internal component.

##### Why
This rose mainly from the issue of developing open-source components, where vast users have different preferred components. The result is the typical "duck" problem -- numerous types and variations available, but they are simply ducks 🦆🦆🦆.

Thus, this component is essentially a high-order component with a [strategy pattern](https://en.wikipedia.org/wiki/Strategy_pattern) in mind. Therefore, as long as the injected component *(injectant)* implements the same core interface, things will render visually identical. On top of that, we can pass along particular props for added flexibility. 

##### When
Use `react-native-super-injector` for building components where there is a strong indication where you suspect the component may be replaced in the future. In addition, where you want to give users greater flexibility without having to touch the core code of your components.

## Install
```bash
$ yarn add react-native-super-injector
```
or
```bash
$ npm install react-native-super-injector
```

## Usage
1. Add an import to the top of your file
    ```js
    import Injector from 'react-native-super-injector';
    ```
2. Declare a defaultComponent for the `Injector`, and include a way to dynamic pass along an optional `Injectant` component and properties. This will allow a component to overload default implementation, and add extra props if needed.
    ```jsx
    const myComponent = (props) => {
        const imageProps = {
            source: {
                uri: "https://test.com/image1.jpeg"
            },
            resizeMode: "contain"
        };
        
        render() {
            return (
                <Injector
                   defaultComponent={Image}
                   defaultProps={imageProps}
                   injectant={props.customComponent}
                   injectantProps={props.customComponentProps}
                />
            )
        }
    }
    ```
3. Now `myComponent` will render `Image` by default, but users can now have the ability to use their own third-party `Image` component if needed.

## Component Props
| Property         | Type                       | Description                                                                                                                    |
|------------------|----------------------------|--------------------------------------------------------------------------------------------------------------------------------|
| defaultComponent | `func` - `react component` | A default component to be used unless a injectant is specified                                                                 |
| defaultProps     | `object`                   | Default properties that are applied in both components                                                                         |
| injectant        | `func` - `react component` | A component that will override the defaultComponent for rendering. Note: this component should abide by a same core interface. |
| injectantProps   | `object`                   | Props that will assign over defaultProps and be applied to the injectant rendering.                                            |

## Examples
These are example repositories / components that are currently using react-native-super-injector.

- [`react-native-super-masonry`](https://github.com/xeoneux/react-native-super-masonry) - A component that handles masonry~ish layouts

## Contribute
While the core of this module is small, feel free to submit issues or provide suggestions on improving usability.

## License
MIT © [Aayush Kapoor](https://github.com/xeoneux/react-native-super-injector)