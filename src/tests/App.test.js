import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

const testIdQuanti = 'value-filter';

describe('Testando aplicação StarWars', () => {
  it('Testa se os elementos forma renderizados', () => {
    render(<App />);

    const inputs = screen.getAllByRole('textbox');
    const selects = screen.getAllByRole('combobox');
    const buttonAdd = screen.getByRole('button', {
      name: /adicionar filtro/i,
    })
    const expectLength = 3;
    const radios = screen.getAllByRole('radio');
    const buttons = screen.getAllByRole('button');

    expect(inputs.length).toBe(1);
    expect(selects.length).toBe(expectLength);
    expect(buttonAdd).toBeInTheDocument();
    expect(radios.length).toBe(2);
    expect(buttons.length).toBe(expectLength);
  });

  it('Verifica funcionalidades de filtrar', async () => {
    render(<App />);

    const inputPlanet = screen.getByPlaceholderText('planet');
    const inputQuanti = screen.getByTestId(testIdQuanti);
    const btnFilter = screen.getByRole('button', {
      name: /adicionar filtro/i,
    })

    expect(inputPlanet).toBeInTheDocument();
    expect(inputQuanti).toBeInTheDocument();

    userEvent.type(inputPlanet, 'Tatooine');
    userEvent.type(inputQuanti, '10');

    userEvent.click(btnFilter);

    const planetas = await screen
      .findAllByTestId('planetas');

    expect(planetas.length).toBe(1);
  });

  it('Verifica Selects', () => {
    render(<App />);

    const elementsSelect = screen.getAllByRole('option');
    const btnFilter = screen.getByRole('button', {
      name: /adicionar filtro/i,
    });

    const selectForm = screen.getByTestId('comparison-filter');
    const columnSelect = screen.getByTestId('column-filter');

    userEvent.selectOptions(selectForm, elementsSelect[7]);

    userEvent.click(btnFilter);

    userEvent.selectOptions(selectForm, elementsSelect[6]);

    userEvent.click(btnFilter);

    userEvent.selectOptions(columnSelect, elementsSelect[2]);

    userEvent.click(btnFilter);
  });

  it('Verifica condições maior que, menor que e igual a', async () => {
    render(<App />);

    const expectLength = 10;

    const planetas = await screen
      .findAllByTestId('planetas', undefined, { timeout: 2000 });

    expect(planetas.length).toBe(expectLength);

    const inputQuanti = screen.getByTestId(testIdQuanti);
    const comparisonSelect = screen.getByTestId('comparison-filter');
    const elementsSelect = screen.getAllByRole('option');
    const columnSelect = screen.getByTestId('column-filter');
    const btnFilter = screen.getByRole('button', {
      name: /adicionar filtro/i,
    });


    userEvent.selectOptions(columnSelect, elementsSelect[3]);
    userEvent.type(inputQuanti, '15000');
    userEvent.selectOptions(comparisonSelect, elementsSelect[6]);
    userEvent.click(btnFilter);

    userEvent.selectOptions(columnSelect, elementsSelect[0]);
    userEvent.type(inputQuanti, '15000');
    userEvent.selectOptions(comparisonSelect, elementsSelect[5]);
    userEvent.click(btnFilter);

    userEvent.selectOptions(columnSelect, elementsSelect[1]);
    userEvent.type(inputQuanti, '15000');
    userEvent.selectOptions(comparisonSelect, elementsSelect[7]);
    userEvent.click(btnFilter);
  });

  it('Verifica funcionalidades de exluir um filtro ou varios', async () => {
    render(<App />);

    const expectLength = 10;

    const planetas = await screen
      .findAllByTestId('planetas', undefined, { timeout: 2000 });

    expect(planetas.length).toBe(expectLength);

    const inputQuanti = screen.getByTestId(testIdQuanti);
    const btnFilter = screen.getByRole('button', {
      name: /adicionar filtro/i,
    });

    userEvent.type(inputQuanti, '5000');
    userEvent.click(btnFilter);

    const exluirBtn = screen.queryByRole('button', {
      name: /remove/i,
    });

    expect(exluirBtn).toBeInTheDocument();

    userEvent.click(exluirBtn);

    userEvent.click(btnFilter);
    userEvent.click(btnFilter);
    userEvent.click(btnFilter);

    const excluiTodosFiltrosBtn = screen.getByTestId('button-remove-filters');

    userEvent.click(excluiTodosFiltrosBtn);
  });

  it('Testando funcionalidades de ordernar desc ou asc!', async () => {
    render(<App />);

    const expectLength = 10;

    const planetas = await screen
      .findAllByTestId('planetas', undefined, { timeout: 2000 });

    expect(planetas.length).toBe(expectLength);

    const radios = screen.getAllByRole('radio');
    const buttonSort = screen.getByRole('button', {
      name: /sort/i,
    });
    const selectSort = screen.getByTestId('column-sort');
    const options = screen.getAllByRole('option');

    userEvent.selectOptions(selectSort, options[9]);
    userEvent.click(buttonSort);
    userEvent.click(radios[1]);
    userEvent.click(buttonSort);
  });

  it('Testando se as opções do select vao mudando', async () => {
    render(<App />);

    const btnFilter = screen.getByRole('button', {
      name: /adicionar filtro/i,
    });

    userEvent.click(btnFilter);
    userEvent.click(btnFilter);
    userEvent.click(btnFilter);
    userEvent.click(btnFilter);
    userEvent.click(btnFilter);

    const options = screen.getAllByRole('option');
    const expectLength = 8;
    const expectLength2 = 5;

    expect(options.length).toBe(expectLength);

    const remove = await screen.findAllByRole('button', {
      name: /remove/i,
    });

    expect(remove.length).toBe(expectLength2);

    userEvent.click(remove[expectLength2 - 1]);
  });
});