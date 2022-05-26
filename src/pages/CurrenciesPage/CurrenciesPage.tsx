import React, { useEffect, useState } from 'react';
import { useGetAllCurrenciesQuery, useGetCurrencyByNameQuery, useGetTwoCurrenciesByNameQuery } from '../../features/currencyApiSlice/currencyApiSlice';
import styles from './CurrenciesPage.module.scss';

const CurrenciesPage = () => {
  const { data, isLoading, isSuccess } = useGetAllCurrenciesQuery();

  const [converterData, setConverterData] = useState<string[]>([]); //
  const converterCurrencyRates = useGetTwoCurrenciesByNameQuery(converterData.join('/'));
  const [converterConversionData, setconverterConversionData] = useState<any>();
  const [converterInputValue, setConverterInputValue] = useState<number>(1);

  const [currencyRateName, setCurrencyRateName] = useState<string>('eur'); // vārds, pēc kā pieprasīt viena elementa reitus
  const allCurrencyRates = useGetCurrencyByNameQuery(currencyRateName); // viena elementa reitu pieprasījums
  const [currencyRateData, setCurrencyRateData] = useState<any>(); // dati par

  useEffect(() => {
    if (converterCurrencyRates.data && converterCurrencyRates.isSuccess) {
      setconverterConversionData(converterCurrencyRates.data);
      console.log(converterCurrencyRates.data);
    }
  }, [converterCurrencyRates.data, converterCurrencyRates.isSuccess]);

  useEffect(() => {
    if (allCurrencyRates.data && allCurrencyRates.isSuccess) {
      setCurrencyRateData(allCurrencyRates.data[currencyRateName]);
    }
  }, [allCurrencyRates.data, allCurrencyRates.isSuccess]);

  // useEffect(() => {

  // }, [converterData]);

  return (
    <div className={styles.maincontainer}>
      <div className={styles.top}>
        <div className={styles.converter}>
          {converterData && converterData.map((cur, index) => {
            const l = 6;
            return (
              <div
                key={Math.random()}
                className={styles.convertercard}
              >
                <span>
                  {cur.toUpperCase()}
                </span>
                <button
                  onClick={() => {
                    setConverterData(converterData.filter((el) => el !== cur));
                  }}
                >
                  X
                </button>
              </div>
            );
          })}
        </div>

        {converterData.length === 2 && (
        <div className={styles.inputbox}>
          <div>
            <input
              className={styles.input}
              value={converterInputValue}
              onChange={(e) => {
                setConverterInputValue(Number(e.target.value));
              }}
              type="number"
            />
            <span>
              {converterInputValue * converterConversionData[converterData[1]]}
            </span>
          </div>
          {/* <button
            onClick={() => {
              setConverterData(converterData.reverse());
              console.log(converterData);
            }}
          >
            Reverse
          </button> */}
          <div>
            <span>
              1
              {' '}
              {converterData[0].toUpperCase()}
              {' '}
              =
              {' '}
            </span>
            <span>
              {converterConversionData && converterConversionData[converterData[1]]}
              {' '}
              {converterData[1].toUpperCase()}
            </span>
          </div>
        </div>
        )}

      </div>
      <div className={styles.allcards}>
        {data && isSuccess && Object.keys(data).map((key) => {
          const b = 5;
          return (
            <div
              key={Math.random()}
              className={styles.card}
            >
              <span>{key.toUpperCase()}</span>
              <button
                onClick={() => {
                  if (converterData.length < 2 && !converterData.includes(key)) {
                    setConverterData([...converterData, key]);
                  }
                }}
              >
                Add to converter
              </button>

              <button
                onClick={() => {
                  setCurrencyRateName(key);
                //   setCurrencyRateData(allCurrencyRates.data && allCurrencyRates.isSuccess && allCurrencyRates.data[currencyRateName]);
                }}
              >
                All rates
              </button>

              <span>
                Rate to:
                {currencyRateName.toUpperCase()}
              </span>
              <span>{currencyRateData && currencyRateData[key]}</span>

            </div>
          );
        })}
        {/* {data && data.results.map(({ name, url }) => {
        const arr = url.split('/');
        const id = arr[arr.length - 2];
        return (
          <div
            key={Math.random()}
            className={styles.singlecard}
          >
            <button>
              Name:
              {' '}
              {name}
            </button>
          </div>
        );
      })} */}
      </div>
    </div>
  );
};

export default CurrenciesPage;
