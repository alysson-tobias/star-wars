import PropTypes from 'prop-types';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import StarWarsContext from './StarWarsContext';

const arry = ['population', 'orbital_period', 'diameter', 'rotation_period',
  'surface_water'];

function StarWarsProvider({ children }) {
  const [list, setList] = useState([]);
  const [planet, setPlanet] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [quantityForm, setQuantityForm] = useState('maior que');
  const [filtersNumerics, setFilterNumerics] = useState([]);
  const [optionsNumerics, setOptionsNumerics] = useState(arry);
  const [column, setColumn] = useState(optionsNumerics[0]);
  const [original, setOriginal] = useState([]);
  const [optionsSort, setOptionsSort] = useState('population');
  const [radioOptions, setRadioOptions] = useState('ASC');

  const handleRadioOptions = ({ target: { value } }) => {
    setRadioOptions(value);
  };

  const handleOptionsSort = ({ target: { value } }) => {
    setOptionsSort(value);
  };

  const handleColumn = ({ target: { value } }) => {
    setColumn(value);
  };

  const handleQuantity = ({ target: { value } }) => {
    setQuantity(value);
  };

  const handleQuantityForm = ({ target: { value } }) => {
    setQuantityForm(value);
  };

  const sortList = useCallback(() => {
    if (radioOptions === 'DESC') {
      const unknowns = [...list].filter((e) => e[optionsSort] === 'unknown');
      const lista = [...list].filter((e) => e[optionsSort] !== 'unknown');
      const arrOrdenado = lista.sort((a, b) => +b[optionsSort] - +a[optionsSort]);
      setList([...arrOrdenado, ...unknowns]);
    }

    if (radioOptions === 'ASC') {
      const unknowns = [...list].filter((e) => e[optionsSort] === 'unknown');
      const lista = [...list].filter((e) => e[optionsSort] !== 'unknown');
      const arrOrdenado = lista.sort((a, b) => +a[optionsSort] - +b[optionsSort]);
      setList([...arrOrdenado, ...unknowns]);
    }
  }, [list, optionsSort, radioOptions]);

  const applyFilters = useCallback(() => {
    const filter = optionsNumerics.filter((e) => e !== column);
    setOptionsNumerics(filter);
    setColumn(filter[0]);
    if (quantityForm === 'maior que') {
      const arrFilter = list.filter((e) => +e[column] > +quantity);
      setList(arrFilter);
      setFilterNumerics([...filtersNumerics,
        { column, comparison: quantityForm, value: quantity, array: arrFilter }]);
    }

    if (quantityForm === 'menor que') {
      const arrFilter = list.filter((e) => +e[column] < +quantity);
      setList(arrFilter);
      setFilterNumerics([...filtersNumerics,
        { column, comparison: quantityForm, value: quantity, array: arrFilter }]);
    }

    if (quantityForm === 'igual a') {
      const arrFilter = list.filter((e) => +e[column] === +quantity);
      setList(arrFilter);
      setFilterNumerics([...filtersNumerics,
        { column, comparison: quantityForm, value: quantity, array: arrFilter }]);
    }
  }, [column, filtersNumerics, list, optionsNumerics, quantity, quantityForm]);

  useEffect(() => {
    const fecthAPi = async () => {
      const endpoint = 'https://swapi.dev/api/planets';
      const reponse = await fetch(endpoint);
      const { results } = await reponse.json();
      const arrFilter = results.map(({ name, climate, created, diameter,
        edited, films, gravity, orbital_period: orbital, population,
        rotation_period: rotation, surface_water: surface, terrain, url }) => ({
        name,
        rotation_period: rotation,
        surface_water: surface,
        terrain,
        url,
        edited,
        films,
        climate,
        diameter,
        created,
        gravity,
        orbital_period: orbital,
        population,
      }));
      setList(arrFilter);
      setOriginal(arrFilter);
    };
    fecthAPi();
  }, []);

  const handlePlanet = ({ target: { value } }) => {
    setPlanet(value);
  };

  const deleteAllFilters = useCallback(() => {
    setList(original);
    setFilterNumerics([]);
    setOptionsNumerics(arry);
  }, [original]);

  const excludeFilters = useCallback((objWillBeRemove) => {
    if (filtersNumerics.length >= 2) {
      const filter = filtersNumerics.filter((e) => e.column !== objWillBeRemove.column);
      setFilterNumerics(filter);
      setOptionsNumerics([...optionsNumerics, objWillBeRemove.column]);
      setList(filtersNumerics[filtersNumerics.length - 2].array);
    }

    if (filtersNumerics.length === 1) {
      const filter = filtersNumerics.filter((e) => e.column !== objWillBeRemove.column);
      setFilterNumerics(filter);
      setOptionsNumerics([...optionsNumerics, objWillBeRemove.column]);
      setList(original);
    }
  }, [filtersNumerics, optionsNumerics, original]);

  const contextValue = useMemo(() => ({
    list,
    planet,
    handlePlanet,
    column,
    handleColumn,
    quantity,
    quantityForm,
    handleQuantity,
    handleQuantityForm,
    applyFilters,
    filtersNumerics,
    optionsNumerics,
    excludeFilters,
    deleteAllFilters,
    handleOptionsSort,
    optionsSort,
    handleRadioOptions,
    radioOptions,
    sortList,
  }), [list, planet, column, quantity, quantityForm, filtersNumerics,
    optionsSort, radioOptions, sortList, applyFilters,
    optionsNumerics, excludeFilters, deleteAllFilters]);
  return (
    <StarWarsContext.Provider value={ contextValue }>
      {children}
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarWarsProvider;
