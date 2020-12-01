import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  Col,
  Row,
} from 'reactstrap';
import ButtonInternalLink from './ButtonInternalLink';

const styles = {
  sliderContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    color:'white'
  }
}

const items = [
  {
    src: '/images/Sustainable.jpeg',
    altText: 'Slide 1',
    caption: 'Slide 1',
    title: 'Sustainable Finance Scheme',
    subtitle: '',
    btn: {
      content: 'Details',
      link: 'https://www.startupindia.gov.in/content/sih/en/government-schemes/sustainable-finance-scheme.html'

    }
  },
  {
    src: '/images/Energy.jpeg',
    altText: 'Slide 2',
    caption: 'Slide 2',
    title: "Solar Roof Top calculator",
    subtitle: '',
    btn: {
      content: 'Calculate',
      link: 'https://solarrooftop.gov.in/rooftop_calculator'

    }
  },
  {
    src: '/images/others.jpeg',
    altText: 'Slide 3',
    caption: 'Slide 3',
    title: 'Save The Enviroment',
    subtitle: '',
    btn: {
      content: 'Start Shopping',
      link: '/category/energy'

    }
  }
];

class CarouselHomepage extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
  } 

  onExiting = () => {
    this.animating = true;
  }

  onExited = () => {
    this.animating = false;
  }

  next = () => {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous = () => {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex = (newIndex) => {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map(x => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={x.src}
        >
          <Row  style={{backgroundColor: '#072a48'}}>
            <Col md="6">
              <img src={x.src} alt={x.altText} style={{width: '100%', maxHeight: '500px'}}/>
            </Col>
            <Col md="6" style={styles.sliderContent}>
              <h2>{x.title}</h2>
              <p>{x.subtitle}</p>
              <ButtonInternalLink 
                content={x.btn.content}
                link={x.btn.link}
                lightOrDark='light'
                sizeBtn='lg'
              />
            </Col>
          </Row>
        </CarouselItem>
      );
    });

    return (
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
    );
  }
}


export default CarouselHomepage;
