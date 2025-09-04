import Layout from '../../components/Layout';

export default function ContactPage() {
  return (
    <Layout title="Contact Us">
      <h1 className="text-3xl font-bold">Contact Us</h1>
      <form className="mx-auto max-w-screen-md">
        <div className="mb-4">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" className="w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" className="w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="message">Message</label>
          <textarea id="message" rows="5" className="w-full"></textarea>
        </div>
        <div className="mb-4">
          <button className="primary-button">Send</button>
        </div>
      </form>
    </Layout>
  );
}