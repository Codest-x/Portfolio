/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Checkbox, Space, Upload, message } from 'antd'
import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
  EditOutlined,
  ClearOutlined
} from '@ant-design/icons'
import { createPost, updatePost } from '../api/Post-requests'
import Swal from 'sweetalert2'
import axios from 'axios'

export default function FormPost(props) {
  const [form] = Form.useForm()
  const onFinish = (values) => {
    const postdata = {
      data: {
        title: values.title,
        shorttitle: values.shorttitle,
        description: values.description,
        link: values.link,
        image: values.image,
        date: values.date
      },
      personal: values.personal,
      featured: values.featured,
      screens: values.screens
    }
    createPost(postdata).then((response) => {
      if (response.data.error) {
        Swal.fire(response.data.error, '', 'error')
      } else {
        Swal.fire(response.data.status, '', 'success')
        document.location.reload()
      }
    })
  }

  const EditPost = () => {
    const values = form.getFieldsValue()
    const postdata = {
      data: {
        title: values.title,
        shorttitle: values.shorttitle,
        description: values.description,
        link: values.link,
        image: values.image,
        date: values.date
      },
      personal: values.personal,
      featured: values.featured,
      screens: values.screens
    }
    console.log(postdata)
    updatePost(props.id, postdata).then((response) => {
      if (response.data.error) {
        Swal.fire(response.data.error, '', 'error')
      } else {
        Swal.fire(response.data.status, '', 'success')
        document.location.reload()
      }
    })
  }

  const onFinishFailed = (errorInfo) => {
    Swal.fire(errorInfo, 'Failed', 'error')
  }

  const propsupload = {
    name: 'image',
    action: 'https://codestapi.herokuapp.com/assets',
    headers: {
      authorization: 'authorization-text'
    },
    beforeUpload: (file) => {
      const match = [
        'image/png',
        'image/jpeg',
        'image/jpg',
        'application/pdf',
        'image/webp',
        'application/java-archive',
        'application/json',
        ''
      ]

      console.log(file)

      if (!match.includes(file.type)) {
        message.error(`${file.name} ${file.type} not allowed format`)
      }
      return match.includes(file.type) || Upload.LIST_IGNORE
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    }
  }

  useEffect(() => {
    form.setFieldsValue(props.post)
  }, [props.post])

  return (
    <div className="w-2/4 h-full overflow-y-auto">
      <div className="w-4/5 mx-auto">
        <h1 className="text-center font-bold">Post Information</h1>
        <Form
          form={form}
          name="basic"
          initialValues={{
            featured: false,
            personal: false,
            date: new Date(Date.now()).toLocaleDateString(),
            image: 'https://codestapi.herokuapp.com/assets/'
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: 'Add a title'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Shorttitle"
            name="shorttitle"
            rules={[
              {
                required: true,
                message: 'Add a shorttitle'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: 'Add a description'
              }
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Link"
            name="link"
            className=""
            rules={[
              {
                required: false,
                message: 'Add a link'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Image"
            name="image"
            rules={[
              {
                required: true,
                message: 'Add a image'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <div className="flex flex-row items-center justify-center w-full">
            <Form.Item
              label="Date"
              name="date"
              rules={[
                {
                  required: true,
                  message: 'Add a date'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="featured"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16
              }}
            >
              <Checkbox> Featured</Checkbox>
            </Form.Item>
            <Form.Item
              name="personal"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16
              }}
            >
              <Checkbox> Personal</Checkbox>
            </Form.Item>
          </div>
          <Form.List name="screens">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{
                      display: 'flex',
                      marginBottom: 8,
                      alignItems: 'start',
                      justifyContent: 'center'
                    }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, 'title']}
                      rules={[
                        { required: true, message: 'Missing title image' }
                      ]}
                    >
                      <Input placeholder="Image Title" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'image']}
                      rules={[
                        { required: true, message: 'Missing image link' }
                      ]}
                    >
                      <Input placeholder="Link Image" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() =>
                      add({
                        title: '',
                        image: 'https://codestapi.herokuapp.com/assets/'
                      })
                    }
                    block
                    icon={<PlusOutlined />}
                  >
                    Add field
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <div className="flex flex-row items-center justify-center gap-8">
            <Form.Item>
              <Button htmlType="submit" icon={<PlusOutlined />}>
                Crear
              </Button>
            </Form.Item>
            <Form.Item>
              <Button onClick={EditPost} icon={<EditOutlined />}>
                Editar
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                onClick={() => {
                  form.resetFields()
                }}
                icon={<ClearOutlined />}
              >
                Limpiar
              </Button>
            </Form.Item>
            <Form.Item>
              <Upload {...propsupload}>
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  )
}
