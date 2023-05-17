import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

const arrPadrao = ['population', 'orbital_period', 'diameter', 'rotation_period',
  'surface_water'];

function Form() {
  const { planet, handlePlanet, quantity, quantityForm,
    handleQuantity, handleQuantityForm,
    column, handleColumn, applyFilters, optionsNumerics,
    filtersNumerics, excludeFilters, deleteAllFilters,
    handleOptionsSort, optionsSort,
    handleRadioOptions, sortList } = useContext(StarWarsContext);
  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        value={ planet }
        onChange={ handlePlanet }
        placeholder="planet"
      />

      <select
        data-testid="column-filter"
        value={ column }
        onChange={ handleColumn }
      >
        {
          optionsNumerics
            .map((e) => (
              <option key={ e } value={ e }>{ e }</option>
            ))
        }
      </select>

      <select
        value={ quantityForm }
        onChange={ handleQuantityForm }
        data-testid="comparison-filter"
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        type="number"
        data-testid="value-filter"
        value={ quantity }
        onChange={ handleQuantity }
        placeholder="quantidade"
      />

      <button
        type="button"
        data-testid="button-filter"
        onClick={ applyFilters }
      >
        Adicionar Filtro
      </button>

      <span style={ { color: 'white' } }>________</span>

      <select
        data-testid="column-sort"
        value={ optionsSort }
        onChange={ handleOptionsSort }
      >
        {
          arrPadrao
            .map((e) => (
              <option key={ e } value={ e }>{ e }</option>
            ))
        }
      </select>

      <label htmlFor="sort-asc">
        Ascendente
        <input
          type="radio"
          name="sort"
          value="ASC"
          id="sort-asc"
          data-testid="column-sort-input-asc"
          defaultChecked
          onChange={ handleRadioOptions }
        />
      </label>

      <label htmlFor="sort-desc">
        Descendente
        <input
          type="radio"
          name="sort"
          value="DESC"
          id="sort-desc"
          data-testid="column-sort-input-desc"
          onChange={ handleRadioOptions }
        />
      </label>

      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ sortList }
      >
        Sort
      </button>

      <br />
      <br />

      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ deleteAllFilters }
      >
        Exluir Todos Filtros
      </button>

      <div>
        {
          filtersNumerics.map((e, index) => (
            <div data-testid="filter" key={ index }>
              <p>{`${e.column} ${e.comparison} ${e.value}`}</p>
              <button
                type="button"
                onClick={ () => excludeFilters(e) }
              >
                Remove
              </button>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Form;
