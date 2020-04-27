import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
  CardHeader,
  Button,
} from "reactstrap";
import axios from "axios";
import Input from "../Input";
import Modal from "../Modal";

export default function CustomCard(props) {
  const { product } = props;

  const [values, setValues] = useState({
    name: product.name,
    sku: product.sku,
    price: product.price,
    description: product.description,
  });

  const [editable, setEditable] = useState({
    name: false,
    sku: false,
    price: false,
    description: false,
  });

  const [modalOpen, setModalOpen] = useState(false);

  function handleClick(type) {
    setEditable({
      name: false,
      sku: false,
      price: false,
      description: false,
      [type]: true,
    });
  }

  function handleBlur(e) {
    setEditable({ ...editable, [e.target.name]: false });

    if (values[e.target.name] !== product[e.target.name]) {
      axios
        .patch(
          `http://localhost:8000/products/${product.id}`,
          { [e.target.name]: e.target.value },
          {
            headers: {
              "content-type": "application/json",
            },
          }
        )
        .then(() => {
          props.triggerFetching();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function deleteProduct() {
    axios
      .delete(`http://localhost:8000/products/${product.id}`, null, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then(() => {
        props.triggerFetching();
        setModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Card>
      <CardHeader onClick={handleClick.bind(this, "name")}>
        <Input
          value={values.name}
          name="name"
          onBlur={handleBlur}
          onChange={(e) =>
            setValues({ ...values, [e.target.name]: e.target.value })
          }
          editable={editable.name}
        />
      </CardHeader>

      <CardBody>
        <CardTitle onClick={handleClick.bind(this, "sku")}>
          <Input
            value={values.sku}
            name="sku"
            onBlur={handleBlur}
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
            editable={editable.sku}
          />
        </CardTitle>
        <CardSubtitle onClick={handleClick.bind(this, "price")}>
          <Input
            value={
              editable.price
                ? values.price
                : `Rp${(+values.price).toLocaleString()}`
            }
            prepend="Rp"
            name="price"
            type="number"
            onBlur={handleBlur}
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: +e.target.value })
            }
            editable={editable.price}
          />
        </CardSubtitle>
        <CardText onClick={handleClick.bind(this, "description")}>
          <Input
            value={values.description}
            name="description"
            onBlur={handleBlur}
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
            type="textarea"
            editable={editable.description}
          />
        </CardText>

        <Button color="danger" onClick={(e) => setModalOpen(true)}>
          Hapus Produk
        </Button>
        <Modal
          open={modalOpen}
          title="Apakah kamu yakin mau menghapus produk berikut?"
          body={
            <div>
              <p>Nama: {product.name}</p>
              <p>SKU: {product.sku}</p>
              <p>Deskripsi: {product.description}</p>
              <p>Harga: Rp{product.price.toLocaleString()}</p>
            </div>
          }
          actionButtons={
            <React.Fragment>
              <Button color="link" onClick={deleteProduct}>
                Ya
              </Button>
              <Button color="primary" onClick={() => setModalOpen(false)}>
                Tidak
              </Button>
            </React.Fragment>
          }
          toggle={() => setModalOpen(false)}
        />
      </CardBody>
    </Card>
  );
}
