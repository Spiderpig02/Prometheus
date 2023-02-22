import React from 'react';
import { render, screen } from '@testing-library/react';
import LagAnnonse from './LagAnnonse';

  describe("Test Lag Annonse", () => {
    it("should render LagAnnonse correctly", () => {
      render(<LagAnnonse/>);
      expect(screen.getByRole("heading")).toBeInTheDocument();
      expect(screen.getByRole("textbox", { name: "Tittel:" })).toBeInTheDocument();
      expect(screen.getByRole("textbox", { name: "Beskrivelse:" })).toBeInTheDocument();
      expect(screen.getByRole("radio", { name: "Annonse" })).toBeInTheDocument();
      expect(screen.getByRole("radio", { name: "Etterspørsel" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Lag annonse eller etterspørsel" })).toBeInTheDocument();
    });

  })

