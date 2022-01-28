/* eslint-disable no-unused-vars */
import { Header } from 'components/Header/Header';
import React from 'react';

export const Layout = ({
  children,
  chosenAgentSet,
  chosenAgent,
  handleChange,
  searchTerm,
}: {
  children: React.ReactNode;
  chosenAgentSet: (value: string) => void;
  chosenAgent: string | null;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
}) => {
  return (
    <main className="Layout">
      <Header
        onAgentChange={chosenAgentSet}
        value={chosenAgent}
        handleChange={handleChange}
        searchTerm={searchTerm}
      />
      <main>{children}</main>
    </main>
  );
};
