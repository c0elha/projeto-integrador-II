import { useState, useEffect, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import axios from 'axios';
import Router from 'next/router';
import RenderCompleted from './RenderCompleted';
import mapIcon from '../utils/mapIcon';
import { getAPIClient } from '../services/axios';
import mapIconGreen from '../utils/mapIconGreen';
import mapIconYellow from '../utils/mapIconYellow';
import mapIconBlack from '../utils/mapIconBlack';
import mapIconBlue from '../utils/mapIconBlue';
import mapIconOrange from '../utils/mapIconOrange';
import mapIconPurple from '../utils/mapIconPurple';
import mapIconRed from '../utils/mapIconRed';
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

interface Occurrence {
  id: number;
  title: string;
  description: string;
}

const FormEdit = ({ id, occurrence, categories }: any) => {
  const { register, handleSubmit, setValue, getValues } = useForm();

  const isMounted = RenderCompleted();

  const [cep, setCep] = useState<string>('');
  // const [categories, setCategories] = useState<Category[]>([]);

  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    -21.6727889, -49.7471393,
  ]);
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [images, setImages] = useState<File[]>([]);
  const [imageChange, setImageChange] = useState<boolean>(false);
  const [previewImages, setPreviewImages] = useState<PreviewImage[]>([]);

  const colorIcon = {
    green: mapIconGreen,
    yellow: mapIconYellow,
    orange: mapIconOrange,
    red: mapIconRed,
    purple: mapIconPurple,
    blue: mapIconBlue,
    black: mapIconBlack,
  } as any;

  function getIconByCategory(category_id: number) {
    var category = categories.find(
      (category: any) => +category.id === +category_id
    );

    if (category) {
      if (category.color && typeof colorIcon[category.color]) {
        return colorIcon[category.color];
      }
    }
    return mapIcon;
  }

  useEffect(() => {
    const values = getValues();

    Object.keys(occurrence).forEach((e, i) => {
      if (typeof values[e] !== 'undefined') {
        setValue(e, occurrence[e]);
      }
    });
    
    setValue('category', +occurrence.category);

    if (+occurrence.latitude && +occurrence.longitude) {
      setPosition({
        latitude: +occurrence.latitude,
        longitude: +occurrence.longitude,
      });
      setInitialPosition([+occurrence.latitude, +occurrence.longitude]);
      setCep(occurrence.cep);
    }
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

    return position.latitude !== 0 ? (
      <Marker
        interactive={false}
        key={position.latitude}
        icon={getIconByCategory(occurrence.category)}
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
    setImageChange(true);
  }

  async function handleRemoveImage(
    event: ChangeEvent<HTMLInputElement>,
    image: PreviewImage
  ) {
    event.preventDefault();

    setPreviewImages(
      previewImages.map((image) => image).filter((img) => img.url !== image.url)
    );
    setImages(
      images.map((image) => image).filter((img) => img.name !== image.name)
    );

    setValue('image', '');
    setImageChange(true);
  }

  async function handleEditOccurrences(data: any) {
    const { latitude, longitude } = position;

    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    formData.append('latitude', String(latitude));
    formData.append('longitude', String(longitude));

    // Uma imagem só
    if (imageChange) {
      if (images.length > 0) {
        images.forEach((image) => {
          formData.append('image', image);
        });
      } else {
        // formData.append('image', '');
      }
    } else {
      formData.append('image', '');
    }

    window.loadingUtils.show();

    await getAPIClient()
      .put(`/occurrences/${id}/`, formData)
      .then(({ data }) => {
        Router.push('/occurrences/list');
      })
      .catch((error) => {
        if (error.response) {
          alert(JSON.parse(error.response.data));
        }
        console.error('error', error);
      })
      .finally(() => window.loadingUtils.hide());
  }

  return (
    <form className='form' onSubmit={handleSubmit(handleEditOccurrences)}>
      <fieldset>
        <legend>Informações da ocorrência</legend>

        <div className='row'>
          <div className='col-12 col-lg-5'>
            <div className='form-group'>
              <label htmlFor='category'>
                Categoria<span className='required-icon'>*</span>
              </label>
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
                {categories.map((caty :any) => {
                  return (
                    <option key={caty.id} value={+caty.id}>
                      {caty.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className='form-group'>
              <label htmlFor='title'>
                Título<span className='required-icon'>*</span>
              </label>
              <input
                {...register('title')}
                id='title'
                className='form-control'
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='description'>
                Descrição<span className='required-icon'>*</span>
              </label>
              <textarea
                {...register('description')}
                rows={4}
                id='description'
                className='form-control'
                required
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
            <div className='form-group'>
              <label htmlFor='images'>Trocar imagem</label>
              <input
                {...register('image')}
                type='file'
                accept='.png, .jpg, .jpeg'
                onChange={handleSelectImages}
                className='form-control'
                id='image'
              />
              {occurrence.image ? (
                <div style={{ textAlign: 'center' }}>
                  <div className='images-container'>
                    <img src={occurrence.image} alt="Imagem enviada pelo usuário ilustrando a ocorrência"></img>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div className='col-12 col-lg-7'>
            <div className='form-group'>
              <label htmlFor='status'>
                Status da ocorrência<span className='required-icon'>*</span>
              </label>
              <select className='form-control' {...register('status')}>
                <option value='NOT_COMPLETED'>Não concluida</option>
                <option value='COMPLETED'>Completa</option>
                <option value='DELETED'>Deletada</option>
              </select>
            </div>
            <div id='map'>
              {isMounted && (
                <MapContainer
                  center={initialPosition}
                  zoom={15}
                  style={{ width: '100%', height: 360 }}
                >
                  <TileLayer
                    url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=sk.eyJ1IjoiZ2VvdmFuYWNvZWxobyIsImEiOiJjbDQycmJzdTg0bG05M2RsOHAycHl1Nm5jIn0.eegan_Kz-MQ4bsFngXBU4A`}
                  />
                  <Markers />
                </MapContainer>
              )}
            </div>
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend>Detalhamento da localização da ocorrência</legend>

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
      </fieldset>

      <div style={{ width: '100%', textAlign: 'center' }}>
        <button type='submit' className='btn btn-primary-outline'>
          Salvar
        </button>
      </div>
    </form>
  );
};

export default FormEdit;
