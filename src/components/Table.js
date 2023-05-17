import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Table() {
  const { list, planet } = useContext(StarWarsContext);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Climate</th>
          <th>Diameter</th>
          <th>Edited</th>
          <th>Films</th>
          <th>Gravity</th>
          <th>Orbital Period</th>
          <th>Population</th>
          <th>Rotation Period</th>
          <th>Surface Water</th>
          <th>Created</th>
          <th>Terrain</th>
          <th>Url</th>
        </tr>
      </thead>
      <tbody>
        {
          list.length > 0 && (
            list.filter((e) => e.name.toLowerCase().includes(planet.toLowerCase()))
              .map((e) => (
                <tr data-testid="planetas" key={ e.name }>
                  <td data-testid="planet-name">{e.name}</td>
                  <td>{e.climate}</td>
                  <td>{e.diameter}</td>
                  <td>{e.edited}</td>
                  <td>{e.films}</td>
                  <td>{e.gravity}</td>
                  <td>{e.orbital_period}</td>
                  <td>{e.population}</td>
                  <td>{e.rotation_period}</td>
                  <td>{e.surface_water}</td>
                  <td>{e.created}</td>
                  <td>{e.terrain}</td>
                  <td>{e.url}</td>
                </tr>
              ))
          )
        }
      </tbody>
    </table>
  );
}

export default Table;
