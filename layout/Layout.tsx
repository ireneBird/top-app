import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';
import { Sidebar } from './Sidebar/Sidebar';
import { LayoutProps } from './Layout.props';
import { FunctionComponent, KeyboardEvent, useRef, useState } from 'react';
import cn from 'classnames';
import styles from './Layout.module.css';
import { AppContextProvider, IAppContext } from '../context/app.context';
import { Up } from '../components';

const Layout = ({ children }: LayoutProps): JSX.Element => {
  const [isDisplayTab, setIsDisplayTab] = useState<boolean>(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  const skipContentAction = (key: KeyboardEvent) => {
    if (key.code == 'Space' || key.code == 'Enter') {
      key.preventDefault();
      bodyRef.current?.focus();
    }

    setIsDisplayTab(false)
  }

  return (
    <div className={styles.wrapper}>
      <a
        onKeyDown={skipContentAction}
        tabIndex={0}
        onFocus={() => setIsDisplayTab(true)}
        className={cn(styles.tabContent, {
          [styles.displayed]: isDisplayTab
        })}>Сразу к содержанию</a>
      <Header className={styles.header} />
      <Sidebar className={styles.sidebar} />
      <main className={styles.body} ref={bodyRef} tabIndex={0} role='main'>
        {children}
      </main>
      <Footer className={styles.footer} />
      <Up />
    </div>
  )
}

export const withLayout = <T extends Record<string, unknown> & IAppContext>(Component: FunctionComponent<T>) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
        <Layout>
          <Component {...props} />
        </Layout>
      </AppContextProvider>
    );
  };
};