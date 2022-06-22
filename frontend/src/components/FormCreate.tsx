import { useState, useEffect, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet-defaulticon-compatibility';
import axios from 'axios';
import Router from 'next/router';
import mapIcon from '../utils/mapIconBlack';
import { getAPIClient } from '../services/axios';
import { getCategories } from '../services/category';

interface PreviewImage {
  name: string;
  url: string;
}

interface Category {
  id: number;
  name: string;
  description: string;
  color: string;
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
    getCategories()
      .then(({ data } : any) => {
        setCategories(data.sort( (a : any, b:any) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)));
      })
  }, []);

  const Markers = () => {
    const map = useMapEvents({
      click(event) {
        const { lat, lng } = event.latlng;

        setPosition({
          latitude: lat,
          longitude: lng,
        });
      },
    });

    return +position.latitude !== 0 && +position.longitude !== 0 ? (
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
      await axios
        .get(`https://viacep.com.br/ws/${cep}/json/`)
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
    
    if(latitude === 0 || longitude === 0) {
      alert("Clique no mapa para escolher uma posição no mapa!");
      return false;
    }

    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    formData.append('latitude', String(latitude));
    formData.append('longitude', String(longitude));

    // Uma imagem só
    if (images.length) {
      images.forEach((image) => {
        formData.append('image', image);
      });
    } else {
      formData.append('image', '');
    }

    await getAPIClient()
      .post('/occurrences/', formData)
      .then(({ data }) => {
        Router.push('/occurrences/list');
      })
      .catch((error) => {});
  }

  return (
    <form className='form' onSubmit={handleSubmit(handleCreateOccurrences)}>
      <fieldset>
        <legend>Informações da ocorrência</legend>

        <div className='row'>
          <div className='col-12 col-lg-5'>

            <div className='form-group'>
              <label htmlFor='category'>Categoria<span className='required-icon'>*</span></label>
              <select
                {...register('category')}
                id='category'
                name='category'
                className='form-control'
                defaultValue={''}
                required
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
              <label htmlFor='title'>Título<span className='required-icon'>*</span></label>
              <input
                {...register('title')}
                id='title'
                className='form-control'
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='description'>Descrição<span className='required-icon'>*</span></label>
              <textarea
                {...register('description')}
                rows={4}
                id='description'
                className='form-control'
                required
              />
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
            </div>
                
            <div className='form-group'>
              <label htmlFor='is_anonymous'>Registrar como anônimo</label>

              <input
                {...register('is_anonymous')}
                type='checkbox'
                className='form-control'
                id='is_anonymous'
              />
              <br />
              <small>Suas informações de usuário não aparecerão para outras pessoas.</small>
            </div>
          </div>
          <div className='col-12 col-lg-7'>
          <div id='map'>
              <MapContainer
                center={initialPosition}
                zoom={15}
                style={{ width: '100%', height: 380 }}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=sk.eyJ1IjoiZ2VvdmFuYWNvZWxobyIsImEiOiJjbDQycmJzdTg0bG05M2RsOHAycHl1Nm5jIn0.eegan_Kz-MQ4bsFngXBU4A`}
                />
                <Markers />
              </MapContainer>
            </div>
            {(+position.latitude == 0 || +position.longitude == 0) && (
              <div
                className='invalid-feedback'
                style={{ textAlign: 'center', padding: '5px' }}
              >
                Clique no mapa para escolher uma posição no mapa!
              </div>
            )}
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend>Detalhamento da localização da ocorrência</legend>
        <div className='row'>
          <div className='col-12'>
            <div className='row'>
              <div className='col-6 form-group'>
                <label htmlFor='cep'>CEP</label>
                <input
                  {...register('cep')}
                  id='cep'
                  type='text'
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

              <div className='col-12 col-md-8 form-group'>
                <label htmlFor='street'>Rua</label>
                <input
                  {...register('street')}
                  id='street'
                  type='text'
                  className='form-control'
                />
              </div>

              <div className='col-12 col-md-2 form-group'>
                <label htmlFor='number'>Número</label>
                <input
                  {...register('number')}
                  id='number'
                  className='form-control'
                />
              </div>

              <div className='col-12 col-md-2 form-group'>
                <label htmlFor='complement'>Complemento</label>
                <input
                  {...register('complement')}
                  id='complement'
                  type='text'
                  className='form-control'
                />
              </div>

              <div className='col-12 col-md-3 form-group'>
                <label htmlFor='point'>Ponto de referência</label>
                <input
                  {...register('point')}
                  id='point'
                  type='text'
                  className='form-control'
                />
              </div>

              <div className='col-12 col-md-3 form-group'>
                <label htmlFor='neighborhood'>Bairro</label>
                <input
                  {...register('neighborhood')}
                  id='neighborhood'
                  type='text'
                  className='form-control'
                />
              </div>

              <div className='col-12 col-md-4 form-group'>
                <label htmlFor='city'>Cidade</label>
                <input
                  {...register('city')}
                  id='city'
                  type='text'
                  value="Lins"
                  disabled
                  className='form-control'
                />
              </div>

              <div className='col-12 col-md-2 form-group'>
                <label htmlFor='uf'>UF</label>
                <input
                  {...register('uf')}
                  id='uf'
                  type='text'
                  value="UF"
                  disabled
                  className='form-control'
                />
              </div>
            </div>
          </div>
          <div className='col-12 col-lg-7'>
          
          </div>
        </div>
      </fieldset>

      <div style={{ width: '100%', textAlign: 'center' }}>
        <button type='submit' className='btn btn-primary-outline'>
          Salvar
        </button>
      </div>
    </form>
  );
};

export default FormCreate;
