import 'isomorphic-fetch';
import stylesheet from 'semantic-ui-css/semantic.min.css';
import { parseString } from 'xml2js';
import Weather from './Weather';

const Page = props => (
  <div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    <style jsx>{`
      main {
        height: 1vh;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
      }
    `}</style>
    <main>
      <Weather data={props.weather} />
    </main>
  </div>
)

const format = async response => {
  const text = await response.text();

  try {
    return JSON.parse(text);
  } catch (e) {
    // Not JSON
  }

  try {
    return new Promise((resolve, reject) => {
      parseString(text, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  } catch (e) {
    // Not XML
  }

  return text;
};

Page.getInitialProps = async ({ req }) => {
  const resources = [
    `https://www.yr.no/sted/Norge/Buskerud/R%C3%B8yken/Slemmestad/varsel.xml`
  ];
  const promises = resources.map(url => fetch(url).then(format));
  const [ weather ] = await Promise.all(promises);

  return { weather: weather.weatherdata }
}

export default Page;

