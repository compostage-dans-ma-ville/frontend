import L from 'leaflet'

interface IconGeneratorParams {color?: string}
type IconGenerator = (params?: IconGeneratorParams) => string
// eslint-disable-next-line no-shadow
const Icon: {[key: string]: IconGenerator} = {
  SITE: (params) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${params?.color ? encodeURIComponent(params.color) : 'black'}"><path d="M12 2c-4.2 0-8 3.22-8 8.2 0 3.18 2.45 6.92 7.34 11.23.38.33.95.33 1.33 0C17.55 17.12 20 13.38 20 10.2 20 5.22 16.2 2 12 2zm0 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path></svg>`,
  CLUSTER: (params) => `<svg fill="${params?.color ? encodeURIComponent(params.color) : 'black'}" viewBox="0 0 24 24"><path d="M16.05 3h-8.1c-.71 0-1.37.38-1.73 1l-4.04 7c-.36.62-.36 1.38 0 2l4.04 7c.36.62 1.02 1 1.73 1h8.09c.71 0 1.37-.38 1.73-1l4.04-7c.36-.62.36-1.38 0-2l-4.04-7c-.35-.62-1.01-1-1.72-1z"></path></svg>`
}

class LeafletHelper {
  static Icon = Icon

  static getIcon = (icon: string): L.Icon => {
    return new L.Icon({
      iconUrl: `data:image/svg+xml,${icon}`,
      iconSize: [40, 40]
    })
  }

  static getClusterIcon = (childrenAmount: number, params?: IconGeneratorParams): L.DivIcon => {
    const icon = decodeURIComponent(LeafletHelper.Icon.CLUSTER(params))
    return L.divIcon({
      html: `
        <div style="position: relative">
          ${icon}
          
          <span style="
            position: absolute; 
            top: 50%; 
            left: 50%; 
            transform: translate(-50%,-60%);
            color: white; 
            font-weight: bold; 
            font-size: 15px;
            text-shadow: -2px -2px 0 black,-2px -1px 0 black,-2px 0px 0 black,-2px 1px 0 black,-2px 2px 0 black,-1px -2px 0 black,-1px -1px 0 black,-1px 0px 0 black,-1px 1px 0 black,-1px 2px 0 black,0px -2px 0 black,0px -1px 0 black,0px 0px 0 black,0px 1px 0 black,0px 2px 0 black,1px -2px 0 black,1px -1px 0 black,1px 0px 0 black,1px 1px 0 black,1px 2px 0 black,2px -2px 0 black,2px -1px 0 black,2px 0px 0 black,2px 1px 0 black,2px 2px 0 black
            "
          >
            ${childrenAmount}
          </span>
        </div>
      `,
      iconSize: [50, 50],
      className: ''
    })
  }
}

export default LeafletHelper
