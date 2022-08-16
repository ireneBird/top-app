import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';
import { Sidebar } from './Sidebar/Sidebar';
import { LayoutProps } from './Layout.props';
import { FunctionComponent } from 'react';

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div>
      <Header />
      <div>
        <Sidebar />
        <div>
          {children}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export const withLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <Layout>
        <Component {...props} />
      </Layout>
    );
  };
};