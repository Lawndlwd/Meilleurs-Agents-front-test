/* eslint-disable no-unused-vars */
import { Header } from 'components/Header/Header';
import React from 'react';

export const Layout = ({
  children,
  chosenAgentSet,
  chosenAgent,
}: {
  children: React.ReactNode;
  chosenAgentSet: (value: string) => void;
  chosenAgent: string | null;
}) => {
  return (
    <main className="Layout">
      <Header onAgentChange={chosenAgentSet} value={chosenAgent} />
      <main>{children}</main>
    </main>
  );
};
