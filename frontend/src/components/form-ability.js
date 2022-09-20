/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { Form, Input, Button, message, Upload } from 'antd'
import {
  PlusOutlined,
  UploadOutlined,
  EditOutlined,
  ClearOutlined
} from '@ant-design/icons'
import { createAbility, updateAbility } from '../api/Abilities-request'
import Swal from 'sweetalert2'

export default function FormPost(props) {
  const [formAbility] = Form.useForm()
  const onFinish = (values) => {
    createAbility(values).then((response) => {
      if (response.data.error) {
        Swal.fire(response.data.error, '', 'error')
      } else {
        Swal.fire(response.data.status, '', 'success')
        document.location.reload()
      }
    })
  }

  const EditAbility = () => {
    updateAbility(props.id, formAbility.getFieldsValue()).then((response) => {
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
        'image/webp'
      ]
      if (!match.includes(file.type)) {
        message.error(`${file.name} not allowed format`)
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
    formAbility.setFieldsValue(props.post)
  }, [props.post])

  return (
    <div className="w-2/4 h-full overflow-y-auto">
      <div className="w-4/5 mx-auto">
        <h1 className="text-center font-bold">Ability Information</h1>
        <Form
          form={formAbility}
          name="basic"
          initialValues={{
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
          <Form.Item
            label="Link"
            name="link"
            rules={[
              {
                required: true,
                message: 'Add a link'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <div className="flex flex-row items-center justify-center gap-8">
            <Form.Item>
              <Button icon={<PlusOutlined />} htmlType="submit" className="">
                Crear
              </Button>
            </Form.Item>
            <Form.Item>
              <Button icon={<EditOutlined />} onClick={EditAbility}>
                Editar
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                onClick={() => {
                  formAbility.resetFields()
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
