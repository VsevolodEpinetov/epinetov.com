import React from 'react';
import { Accordion } from "@mantine/core"

const ListOfRules = ( {rules} ) => {
  return (
    <Accordion variant="filled" chevronPosition="left" defaultValue="rules-0" style={{ paddingTop: '20px' }}>
      {rules.map((r, i) => {
        return (
          <Accordion.Item value={`rules-${i}`} key={`rules-${i}`}>
            <Accordion.Control>{r.title}</Accordion.Control>
            <Accordion.Panel>{r.description}</Accordion.Panel>
          </Accordion.Item>
        )
      })}
    </Accordion>
  );
};

export default ListOfRules;