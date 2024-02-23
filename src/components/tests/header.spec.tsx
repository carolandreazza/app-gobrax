import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import { Header } from '../header';

describe('Header', () => {
    it('should render correctly', () => {
        render(<Header/>)

        expect(screen.getByText("Motoristas")).toBeInTheDocument();
        expect(screen.getByText("Veículos")).toBeInTheDocument();
    });
});