import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

// with some props

interface ISampleComponentWithRouteProps {
  foo: string;
}

export const SampleComponentWithRoute: React.ComponentClass<
  Omit<ISampleComponentWithRouteProps, keyof RouteComponentProps<any>>
> = withRouter(({ history, foo }: ISampleComponentWithRouteProps & RouteComponentProps<{}>) => {
  return <div />;
});

// with empty props

export const SampleComponent2WithRoute: React.ComponentClass<{}> = withRouter(
  ({ history }: RouteComponentProps<{}>) => {
    return <div />;
  }
);
