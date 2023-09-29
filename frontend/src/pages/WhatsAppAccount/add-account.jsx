import { useFormik } from "formik";
import React from "react";
import { useLocation } from "react-router-dom";
import
    {
        Button,
        Card,
        CardBody,
        Col,
        Container,
        Form,
        FormFeedback,
        FormGroup,
        Input,
        Label,
        Row,
    } from "reactstrap";
import * as Yup from "yup";
import Breadcrumbs from "../../Components/Common/Breadcrumb";

const AddAccount = () => {
  const location = useLocation();
  const initialValue = location.state ? location.state : {};
  const mode = location.state ? "Edit" : "Add";
  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: Yup.object({
      number: Yup.string().required("This field is required"),
      code: Yup.string().required("This field is required"),
      ip: Yup.string().required("This field is required"),
      port: Yup.string().required("This field is required"),
    }),

    onSubmit: (values) => {
      console.log("value", values);
    },
  });

  const allowedExtensions = [".csv", ".xls"];
  const uploadFormik = useFormik({
    initialValues: { file: null },
    validationSchema: Yup.object({
      file: Yup.mixed()
        .required("This field is required")
        .test("fileType", "Invalid file format. Please select a .csv or .xls file.", (value) => {
          if (!value) return false;
          const fileExtension = value.name
            .slice(((value.name.lastIndexOf(".") - 1) >>> 0) + 2)
            .toLowerCase();
          return allowedExtensions.includes(`.${fileExtension}`);
        }),
    }),

    onSubmit: (values) => {
      console.log("Submitted values:", values);
    },
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Whatsapp Accounts" breadcrumbItem={mode + " Whatsapp Account"} />
          <Card>
            <CardBody>
              <Row>
                <Col md={6}>
                  <Form onSubmit={formik.handleSubmit}>
                    <FormGroup>
                      <Label htmlFor="number">Whatsapp Number</Label>
                      <Input
                        type="text"
                        id="number"
                        name="number"
                        placeholder=""
                        value={formik.values.number}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        invalid={formik.touched.number && formik.errors.number ? true : false}
                      />
                      {formik.errors.number && formik.touched.number && (
                        <FormFeedback>{formik.errors.number}</FormFeedback>
                      )}
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="code">Whatsapp Code</Label>
                      <Input
                        type="text"
                        id="code"
                        name="code"
                        placeholder=""
                        value={formik.values.code}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        invalid={formik.touched.code && formik.errors.code ? true : false}
                      />
                      {formik.errors.code && formik.touched.code && (
                        <FormFeedback>{formik.errors.code}</FormFeedback>
                      )}
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="ip">Proxy IP</Label>
                      <Input
                        type="text"
                        id="ip"
                        name="ip"
                        placeholder=""
                        value={formik.values.ip}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        invalid={formik.touched.ip && formik.errors.ip ? true : false}
                      />
                      {formik.errors.ip && formik.touched.ip && (
                        <FormFeedback>{formik.errors.ip}</FormFeedback>
                      )}
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="port">Proxy Port</Label>
                      <Input
                        type="text"
                        id="port"
                        name="port"
                        placeholder=""
                        value={formik.values.port}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        invalid={formik.touched.port && formik.errors.port ? true : false}
                      />
                      {formik.errors.port && formik.touched.port && (
                        <FormFeedback>{formik.errors.port}</FormFeedback>
                      )}
                    </FormGroup>

                    <div>
                      <Button type="submit" color="primary">
                        Submit
                      </Button>
                    </div>
                  </Form>
                </Col>
                <Col md={6}>
                  <Form onSubmit={uploadFormik.handleSubmit}>
                    <FormGroup>
                      <Label htmlFor="file">Select file (.csv/.xls)</Label>
                      <Input
                        type="file"
                        id="file"
                        name="file"
                        accept=".csv, .xls"
                        onChange={(event) => {
                          uploadFormik.setFieldValue("file", event.currentTarget.files[0]);
                        }}
                        onBlur={uploadFormik.handleBlur("file")}
                        invalid={
                          uploadFormik.touched.file && uploadFormik.errors.file ? true : false
                        }
                      />
                      {uploadFormik.errors.file && uploadFormik.touched.file && (
                        <div className="text-danger font-size-10 my-1">
                          {uploadFormik.errors.file}
                          <FormFeedback>{uploadFormik.errors.file}</FormFeedback>
                        </div>
                      )}
                    </FormGroup>

                    <div>
                      <Button type="submit" color="primary">
                        Submit
                      </Button>
                    </div>
                  </Form>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AddAccount;
