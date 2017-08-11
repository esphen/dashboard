import React from 'react';
import { Table } from 'semantic-ui-react'
import { format } from 'date-fns';

export default props => (
  <Table celled>
    <Table.Body>
      {props.data.forecast[0].tabular[0].time.map((elem, i) => {
        const { from, to, period } = elem.$;
        const precipitation = elem.precipitation[0].$.value;
        const temperature = elem.temperature[0].$.value;

        return (
          <Table.Row key={i}>
            <Table.Cell>{format(new Date(from), 'HH:mm dddd')}</Table.Cell>
            <Table.Cell>{format(new Date(to), 'HH:mm dddd')}</Table.Cell>
            <Table.Cell>{temperature}</Table.Cell>
            <Table.Cell>{precipitation}</Table.Cell>
          </Table.Row>
        )
      })}
    </Table.Body>
  </Table>
);

