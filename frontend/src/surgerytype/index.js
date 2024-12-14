import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, ButtonGroup, Table } from "reactstrap";
import tokenService from "../services/token.service";
import useFetchState from "../util/useFetchState";

const jwt = tokenService.getLocalAccessToken();

export default function SurgeryTypeListing() {
    const [message, setMessage] = useState(null);
    const [visible, setVisible] = useState(false);
    const [lista, setLista] = useFetchState(
        [],
        `/api/v1/surgerytypes`,
        jwt,
        setMessage,
        setVisible
      );

      const coursesList = lista.map((listitem) => {
        return (
          <tr key={listitem.id}>
            <td>{listitem.name}</td>
            <td>
                <ul>
                    {listitem.susceptiblePetTypes.map((type) => (
                        <li key={type.id}>{type.name}</li>
                    ))}
                </ul>
            </td>
          </tr>
        );
      });
    
    return (
        <>
            <div>
          <Table aria-label="courses" className="mt-4">
            <thead>
              <tr>
                <th width="10%">Name</th>
                <th width="10%">Pet Types</th>
              </tr>
            </thead>
            <tbody>{coursesList}</tbody>
          </Table>
          </div>
        </>
    );
}