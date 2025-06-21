import { useState, useEffect } from "react";
import {
  Form,
  Upload,
  Typography,
  Row,
  Col,
  message,
  Button,
  Space,
  Input,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import TextContainer from "../../TextContainer/TextContainer";
import type { IStepProps } from "../../../interfaces/Signup";
import styles from "./StepFour.module.scss";
import {
  avatarRestaurantOptions,
  avatarCompanyOptions,
} from "../../../data/mockData";

const { Text } = Typography;

export default function StepFour({
  formData,
  onImageChange,
}: IStepProps & { onImageChange: (img: string) => void }) {
  const userType = formData.userType || "company";
  const subtitle = `Escolha um logo para ${
    userType === "restaurant" ? "seu restaurante" : "sua empresa"
  }`;

  const form = Form.useFormInstance();
  const predefinedLogos =
    userType === "restaurant"
      ? avatarRestaurantOptions
      : avatarCompanyOptions;

  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const imageFromFormData = formData.profileImage || "";
    const initialImage = form.getFieldValue("image") || imageFromFormData;

    setSelectedImage(initialImage);
    form.setFieldValue("image", initialImage);
  }, [formData.profileImage, form]);

  const handleCloudinaryUpload = async (file: File): Promise<string> => {
    const formDataUpload = new FormData();
    formDataUpload.append("file", file);
    formDataUpload.append("upload_preset", "foodclub");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dwyx99q1j/image/upload",
        {
          method: "POST",
          body: formDataUpload,
        }
      );
      const data = await res.json();
      if (data.secure_url) {
        message.success("Imagem enviada com sucesso!");
        form.setFieldValue("image", data.secure_url);
        setSelectedImage(data.secure_url);
        onImageChange(data.secure_url);
        return data.secure_url;
      } else {
        throw new Error("Erro ao enviar imagem.");
      }
    } catch (err) {
      console.error(err);
      message.error("Erro ao enviar imagem.");
      return "";
    }
  };

  const handleSelectImage = (image: string) => {
    form.setFieldValue("image", image);
    setSelectedImage(image);
    onImageChange(image);
  };

  return (
    <div className={styles.container}>
      <TextContainer
        title={userType === "restaurant" ? "Restaurante" : "Empresa"}
        subtitle={subtitle}
      />

      <Row gutter={[8, 8]} className={styles.iconGrid}>
        {predefinedLogos.map(({ key, image }) => (
          <Col span={8} key={key}>
            <div
              className={styles.iconItem}
              onClick={() => handleSelectImage(image)}
              style={{
                border:
                  selectedImage === image
                    ? "2px solid #8B0000"
                    : "2px solid transparent",
              }}
            >
              <img src={image} alt={key} />
            </div>
          </Col>
        ))}
      </Row>

      <Text className={styles.orText}>Ou faça upload de uma imagem</Text>

      <Space direction="vertical" style={{ width: "100%" }} size="middle">
        <Upload
          customRequest={async ({ file, onSuccess }) => {
            const url = await handleCloudinaryUpload(file as File);
            if (url) onSuccess?.({ url });
          }}
          listType="picture"
          showUploadList={false}
          maxCount={1}
        >
          <Button
            icon={<UploadOutlined />}
            style={{ backgroundColor: "#8B0000", color: "#fff" }}
          >
            Escolher arquivo
          </Button>
        </Upload>
      </Space>

      <Form.Item
        name="image"
        rules={[{ required: true, message: "Selecione ou envie uma imagem." }]}
        style={{ margin: 0, height: 0, overflow: "hidden" }}
      >
        <Input type="hidden" />
      </Form.Item>

      {selectedImage && (
        <Text className={styles.filename}>
          {selectedImage.split("/").pop()}
        </Text>
      )}
    </div>
  );
}
