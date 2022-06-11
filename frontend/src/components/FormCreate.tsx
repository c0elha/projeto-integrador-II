import dynamic from 'next/dynamic';
import { useState, useEffect, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
const position = [51.505, -0.09];
import { api } from '../services/api';
import L from 'leaflet';
// import mapIcon from "../utils/mapIcon";
// const mapIcon = L.icon({ iconUrl: "/images/marker-icon.png" });
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import axios from 'axios';
import Router from 'next/router'
import mapIcon from '../utils/mapIcon';

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
  const { register, handleSubmit, setValue } = useForm();

  const [cep, setCep] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);

  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    -21.6727889, -49.7471393,
  ]);
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<PreviewImage[]>([]);

  useEffect(() => {
    api
      .get('/occurrences-categories/')
      .then(({ data }) => {
        setCategories(data);
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
        icon={mapIcon}
        position={[position.latitude, position.longitude]}
      />
    ) : null;
  };

  function handleChangeCep(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();

    setCep(event.target.value.replace(/[^a-zA-Z0-9 ]/g, ''));

    searchCep();
  }

  function handleSearchCep(event: any) {
    event.preventDefault();
    searchCep();
  }

  async function searchCep() {
    if (cep.length >= 8) {
      
      await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      .then(async ({ data }) => {
        if (data.bairro) {
          setValue('neighborhood', data.bairro);
        }

        if (data.logradouro) {
          setValue('street', data.logradouro);
        }

        if (data.uf) {
          setValue('uf', data.uf.toUpperCase());
        }

        if (data.localidade) {
          setValue('city', data.localidade);
        }

        // var query = `${cep} ${data.logradouro}, ${data.localidade}, ${data.uf}`;
        // await axios.get(`http://api.positionstack.com/v1/forward?access_key=75c2c6976566e786d07e8df97bcc21b3&query="${query}, Brazil"`)
        //   .then(({data}) =>{
        //     if(data.data && data.data.length > 0){
        //       var firstLocation = data.data[0];
        //       setInitialPosition([firstLocation.latitude,firstLocation.longitude])
        //       console.log('firstLocations', firstLocation);
        //     }
           
        //   })
      });
    }
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
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

    const { latitude, longitude } = position;

    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    formData.append('latitude', String(latitude));
    formData.append('longitude', String(longitude));

    // Uma imagem só
    console.log(images);
    if(images.length){
      images.forEach((image) => {
        formData.append('image', image);
      });
    } else{
      formData.append('image', '');
    }

    await api
      .post('/occurrences/', formData)
      .then(({data}) => { 
        Router.push('/occurrences/list');
      })
      .catch((error) => { });

    console.log('data', formData);
  }

  return (
    <form className='form' onSubmit={handleSubmit(handleCreateOccurrences)}>
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
                  onChange={(event) => handleChangeCep(event)}
                />
              </div>

              <div
                className='col-6 form-group'
                style={{ display: 'flex', alignItems: 'flex-end' }}
              >
                <button
                  className='btn btn-primary-outline'
                  onClick={handleSearchCep}
                >
                  Buscar
                </button>
              </div>

              <div className='col-8 form-group'>
                <label htmlFor='street'>Rua</label>
                <input
                  {...register('street')}
                  id='street'
                  type='text'
                  required
                  className='form-control'/>
              </div>

              <div className='col-4 form-group'>
                <label htmlFor='number'>Número</label>
                <input
                  {...register('number')}
                  id='number'
                  className='form-control'/>
              </div>

              <div className='col-6 form-group'>
                <label htmlFor='complement'>Complemento</label>
                <input
                  {...register('complement')}
                  id='complement'
                  type='text'
                  className='form-control'/>
              </div>

              <div className='col-6 form-group'>
                <label htmlFor='point'>Ponto de referencia</label>
                <input
                  {...register('point')}
                  id='point'
                  type='text'
                  className='form-control'/>
              </div>

              <div className='col-5 form-group'>
                <label htmlFor='neighborhood'>Bairro</label>
                <input
                  {...register('neighborhood')}
                  id='neighborhood'
                  type='text'
                  required
                  className='form-control'/>
              </div>

              <div className='col-4 form-group'>
                <label htmlFor='city'>Cidade</label>
                <input
                  {...register('city')}
                  id='city'
                  type='text'
                  required
                  className='form-control'/>
              </div>

              <div className='col-3 form-group'>
                <label htmlFor='uf'>UF</label>
                <input
                  {...register('uf')}
                  id='uf'
                  type='text'
                  required
                  className='form-control'/>
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
              <label htmlFor='category'>Categoria</label>
              <select
                {...register('category')}
                id='category'
                name='category'
                className='form-control'
                defaultValue={''}
                
              >
                <option value={''} disabled>
                  Selecione uma categoria
                </option>
                {categories.map((category) => {
                  return (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  );
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

              {/* <div className='images-container'>
                {previewImages.map((image) => {
                  return (
                    <div key={image.url}>
                      <span
                        className='remove-image'
                        onClick={() => handleRemoveImage(image)}
                      >
                        Remover
                      </span>
                      <img src={image.url} className='added-image' />
                    </div>
                  );
                })}

                <label htmlFor='image[]' className='new-image'>
                  Adicionar
                </label>
              </div> */}
            </div>
          </div>
          <div className='col-12 col-lg-7'>
            <div className='form-group'>
              <label htmlFor='title'>Título</label>
              <input
                {...register('title')}
                id='title'
                className='form-control'
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='description'>Descrição</label>
              <textarea
                {...register('description')}
                rows={4}
                id='description'
                className='form-control'
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='is_anonymous'>Registrar como anonimo</label>

              <input
                {...register('is_anonymous')}
                type='checkbox'
                className='form-control'
                id='is_anonymous'
              />
              <br />
              <small>
                Suas informações de usuario não ira aparece para outras pessoas.
              </small>
            </div>
          </div>
        </div>
      </fieldset>

      <div  style={{ width: '100%', textAlign: 'center' }}>
        <button type='submit' className='btn btn-primary-outline'>
          Salvar
        </button>
      </div>   
    </form>
  );
};

export default FormCreate;
