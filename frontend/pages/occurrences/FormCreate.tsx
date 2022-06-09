import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
const position = [51.505, -0.09];
import { api } from './../../src/services/api';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

interface PreviewImage {
  name: string;
  url: string;
}

interface Category {
  id: number;
  name: string;
  description: string;
}

const FormCreate = () => {
  const { register, handleSubmit } = useForm();

  const [categories, setCategories] = useState<Category[]>([]);

  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    -21.6732613, -49.74705934,
  ]);
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<PreviewImage[]>([]);

  useEffect(() => {
    api
      .get('/occurrences-categories/')
      .then(({ data }) => {
        setCategories(data);
        console.log(data);
      })
      .catch((error) => { });
  }, []);

  const Markers = () => {
    const map = useMapEvents({
      click(event) {
        console.log('useMapEvents ->', event);
        const { lat, lng } = event.latlng;

        setPosition({
          latitude: lat,
          longitude: lng,
        });
      },
    });

    return position.latitude !== 0 ? (
      <Marker
        interactive={false}
        key={position.latitude}
        position={[position.latitude, position.longitude]}
      />
    ) : null;
  };

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    console.log('event', event);
    if (!event.target.files) {
      return;
    }
    const selectedImages = Array.from(event.target.files);

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map((image) => {
      return { name: image.name, url: URL.createObjectURL(image) };
    });

    setPreviewImages(selectedImagesPreview);
  }

  function handleRemoveImage(image: PreviewImage) {
    setPreviewImages(
      previewImages.map((image) => image).filter((img) => img.url !== image.url)
    );
    setImages(
      images.map((image) => image).filter((img) => img.name !== image.name)
    );
  }

  async function handleCreateOccurrences(data: any) {
    console.log('handleCreateOccurrences', data);
    console.log('position', position);

    const { latitude, longitude } = position;

    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    formData.append('latitude', String(latitude));
    formData.append('longitude', String(longitude));

    // Uma imagem só
    images.forEach((image) => {
      formData.append('image', image);
    });

    await api
      .post('/occurrences/', formData)
      .then((res) => { })
      .catch((error) => { });

    console.log('data', formData);
  }

  return (
    <form onSubmit={handleSubmit(handleCreateOccurrences)}>
      <fieldset>
        <legend>Dados de localização da ocorrência</legend>
        <div className='row'>
          <div className='col-12 col-lg-5'>
            <div className='row'>
              <div className='col-6 form-group'>
                <label htmlFor='cep'>CEP</label>
                <input
                  {...register('cep')}
                  id='cep'
                  type='text'
                  required
                  className='form-control'
                  onChange={(event) => console.log('')}
                />
              </div>

              <div className='col-6 form-group'>
                Buscar
              </div>




              <div className='col-8 form-group'>
                <label htmlFor='street'>Rua</label>
                <input
                  {...register('street')}
                  id='street'
                  type='text'
                  required
                  className='form-control'
                  onChange={(event) => console.log('')}
                />
              </div>

              <div className='col-4 form-group'>
                <label htmlFor='number'>Número</label>
                <input
                  {...register('number')}
                  id='number'
                  required
                  className='form-control'
                  onChange={(event) => console.log('')}
                />
              </div>

              <div className='col-6 form-group'>
                <label htmlFor='street'>Complemento</label>
                <input
                  {...register('street')}
                  id='street'
                  type='text'
                  required
                  className='form-control'
                  onChange={(event) => console.log('')}
                />
              </div>

              <div className='col-6 form-group'>
                <label htmlFor='street'>Ponto de referencia</label>
                <input
                  {...register('street')}
                  id='street'
                  type='text'
                  required
                  className='form-control'
                  onChange={(event) => console.log('')}
                />
              </div>

              <div className='col-5 form-group'>
                <label htmlFor='street'>Bairro</label>
                <input
                  {...register('street')}
                  id='street'
                  type='text'
                  required
                  className='form-control'
                  onChange={(event) => console.log('')}
                />
              </div>

              <div className='col-4 form-group'>
                <label htmlFor='street'>Cidade</label>
                <input
                  {...register('street')}
                  id='street'
                  type='text'
                  required
                  className='form-control'
                  onChange={(event) => console.log('')}
                />
              </div>

              <div className='col-3 form-group'>
                <label htmlFor='street'>UF</label>
                <input
                  {...register('street')}
                  id='street'
                  type='text'
                  required
                  className='form-control'
                  onChange={(event) => console.log('')}
                />
              </div>
            </div>

          </div>
          <div className='col-12 col-lg-7'>
            <div id='map'>
              <MapContainer
                center={initialPosition}
                zoom={15}
                style={{ width: '100%', height: 280 }}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=sk.eyJ1IjoiZ2VvdmFuYWNvZWxobyIsImEiOiJjbDQycmJzdTg0bG05M2RsOHAycHl1Nm5jIn0.eegan_Kz-MQ4bsFngXBU4A`}
                />
                <Markers />
              </MapContainer>
            </div>
          </div>

        </div>

      </fieldset>

      <fieldset>
        <legend>Informações da ocorrência</legend>

        <div className='row'>
          <div className='col-12 col-lg-5'>
            <div className='form-group'>
              <label htmlFor='category'>Category</label>
              <select
                {...register('category')}
                id='category'
                name='category'
                className='form-control'
                defaultValue={''}
                onChange={(event) => console.log('')}
              >
                <option value={''} disabled >Selecione uma categoria</option>
                {categories.map((category) => {
                  return <option key={category.id} value={category.id}>{category.name}</option>;
                })}
              </select>
            </div>
            <div className='form-group'>
              <label htmlFor='images'>Fotos</label>
              <input
                {...register('image')}
                type='file'
                accept='.png, .jpg, .jpeg'
                onChange={handleSelectImages}
                className='form-control'
                id='image'
              />

              <div className='images-container'>
                {previewImages.map((image) => {
                  return (
                    <div key={image.url}>
                      <span
                        className='remove-image'
                        onClick={() => handleRemoveImage(image)}
                      >
                        Remover
                      </span>
                      <img src={image.url} alt={name} className='added-image' />
                    </div>
                  );
                })}

                <label htmlFor='image[]' className='new-image'>
                  Adicionar
                </label>
              </div>
            </div>
          </div>
          <div className='col-12 col-lg-7'>
            <div className='form-group'>
              <label htmlFor='title'>Título</label>
              <input
                {...register('title')}
                id='title'
                className='form-control'
                onChange={(event) => console.log('')}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='description'>Descrição</label>
              <textarea
                {...register('description')}
                rows={4}
                id='description'
                className='form-control'
                onChange={(event) => console.log('')}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='is_anonymous'>Registrar como anonimo</label>

              <input
                {...register('is_anonymous')}
                type='checkbox'
                className='form-control'
                id='is_anonymous'
                onChange={(event) => console.log('')}
              />
              <br />
              <small>
                Suas informações de usuario não ira aparece para outras pessoas.
              </small>
            </div>

          </div>
        </div>
      </fieldset>

      <button type='submit' className='btn btn-primary-outline'>Salvar</button>
    </form>
  );
};

export default FormCreate;
