import React, {useEffect} from 'react';
import { Table } from 'react-bootstrap';

const Dashboard = () => {


useEffect(()=>{
  // fetch Data from the server
},[])

  const database = [
    {
      "_id": "6224e14e7ebe00169ec190b9",
      "prescription_id": "6224e14ee32726b527e5a150",
      "investigation": 0,
      "medicine": "2eb96df7-21a9-4c1b-95fd-32c5133805c6",
      "test": "Bowen Giles"
    },
    {
      "_id": "6224e14ed2c671cfe80fb0c2",
      "prescription_id": "6224e14e7e9585322cec4173",
      "investigation": 1,
      "medicine": "71e6966a-b8b5-49fe-b8a7-ee40a4addd0d",
      "test": "Hubbard Kramer"
    },
    {
      "_id": "6224e14e717a4351e1a06632",
      "prescription_id": "6224e14e584bb001291eacaa",
      "investigation": 2,
      "medicine": "15bdf3f1-3d0b-4034-a835-c13b16c58c80",
      "test": "Hahn Larson"
    },
    {
      "_id": "6224e14ec0bc3906f3c4fbb9",
      "prescription_id": "6224e14eacc074d3753df968",
      "investigation": 3,
      "medicine": "fab8f62a-f551-4792-9bb1-575747c08b30",
      "test": "Fernandez Kaufman"
    },
    {
      "_id": "6224e14e7f704cb16469d372",
      "prescription_id": "6224e14e35cf56b616efaaab",
      "investigation": 4,
      "medicine": "89fe4c8b-4b5c-4ef6-89b0-631a3142be87",
      "test": "Riddle Logan"
    },
    {
      "_id": "6224e14e6ee08daa74a56e83",
      "prescription_id": "6224e14e01bd45a700b4f457",
      "investigation": 5,
      "medicine": "9f726a23-23e1-4d7c-8d3e-e05be446eb95",
      "test": "Stephens Park"
    },
    {
      "_id": "6224e14e4940e84a85f76fc2",
      "prescription_id": "6224e14eb00a69e6694a4ead",
      "investigation": 6,
      "medicine": "17a6e93e-0537-4e3c-89d9-41fdd493a208",
      "test": "Hess Glass"
    },
    {
      "_id": "6224e14ed07f2251e4f6bcf4",
      "prescription_id": "6224e14e1199f6c182422919",
      "investigation": 7,
      "medicine": "2d343501-37e7-4b4a-af5f-1ee885208429",
      "test": "Young Stein"
    },
    {
      "_id": "6224e14ef044319645cf3fc1",
      "prescription_id": "6224e14eca0fadd652b95a85",
      "investigation": 8,
      "medicine": "787b8da8-5181-4a46-8fdd-3976710032df",
      "test": "Haynes Weiss"
    },
    {
      "_id": "6224e14e50459cb580155dde",
      "prescription_id": "6224e14e36e8a871ce022538",
      "investigation": 9,
      "medicine": "f3e8720f-cd76-4d7f-b486-6d946bb4ca9b",
      "test": "Juliet Sawyer"
    },
    {
      "_id": "6224e14e7dbc847ae79dff95",
      "prescription_id": "6224e14edf324ef10dd8777a",
      "investigation": 10,
      "medicine": "07099559-49f6-4098-8d72-d6af801809e9",
      "test": "Clarissa Leach"
    },
    {
      "_id": "6224e14e91f0d17579cce8dc",
      "prescription_id": "6224e14e1aa3eb3c58c98e89",
      "investigation": 11,
      "medicine": "26c30337-71d9-4e3c-b12c-8b2ea31e5cc3",
      "test": "Mccray Tran"
    }
  ]
  return(
    <>
    <h2>Dashboard</h2>
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Prescription ID</th>
          <th>investigation</th>
          <th>medicine</th>
          <th>test</th>
        </tr>
      </thead>
      <tbody>
        {
          database.map((row)=>{
            return(
              <tr>
                <td>{row._id}</td>
                <td>{row.prescription_id}</td>
                <td>{row.investigation}</td>
                <td>{row.medicine}</td>
                <td>{row.test}</td>
              </tr>
            )
          })
        }
      </tbody>
    </Table>
  </>
  );
}

export default Dashboard;