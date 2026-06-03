import { useParams } from 'react-router-dom'
import DemoChrome from '../components/DemoChrome.jsx'
import { getExtComponent } from '../ext/registry.js'
import { demos } from '../prompts.js'

// Renders an external effect by its slug (/x/:slug), wrapped in the usual chrome
// (sidebar + "View code"). The chrome hides itself inside the preview iframe.
export default function ExtHost() {
  const { id } = useParams()
  const Comp = getExtComponent(id)
  const demo = demos.find((d) => d.route === `/x/${id}`)
  if (!Comp) return <div style={{ padding: 40, fontFamily: 'var(--font-ui)' }}>Unknown effect: {id}</div>
  return (
    <DemoChrome id={demo ? demo.id : null}>
      <Comp />
    </DemoChrome>
  )
}
