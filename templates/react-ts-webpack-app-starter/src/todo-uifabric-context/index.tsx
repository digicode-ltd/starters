import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FluentCustomizations } from '@uifabric/fluent-theme';
import { Customizer, Fabric, initializeIcons, mergeStyles } from 'office-ui-fabric-react';
import { TodoApp } from './components/TodoApp';

// Inject some global styles
mergeStyles({
  selectors: {
    ':global(body), :global(html), :global(#app)': {
      margin: 0,
      padding: 0,
      height: '100vh',
    },
  },
});

// Initializes the UI Fabric icons that we can use
// Choose one from this list: https://developer.microsoft.com/en-us/fabric#/styles/icons
initializeIcons();

ReactDOM.render(
  <Customizer {...FluentCustomizations}>
    <Fabric>
      <TodoApp />
    </Fabric>
  </Customizer>,
  document.getElementById('app')
);
