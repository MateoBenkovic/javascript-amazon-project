class Car {
  #brand;
  #model;
  speed;
  isTrunkOpen;

  constructor(carDetails) {
    this.#brand = carDetails.brand;
    this.#model = carDetails.model; 
    this.speed = carDetails.speed;
    this.isTrunkOpen = carDetails.isTrunkOpen;
  }

  displayInfo() {
    console.log(`${this.#brand} ${this.#model} Speed: ${this.speed}km/h Trunk is open: ${this.isTrunkOpen}`);
  }

  go() {
    if (this.acceleration) {
      if (this.speed > 300) {
        this.speed = 300;
      } else {
        this.speed += this.acceleration;
      }
    } else {
      if (this.isTrunkOpen === false) {
      if (this.speed > 200) {
      this.speed = 200;
    } else {
      this.speed += 5;
          }
        }
      }
    }

  brake() {
    if (this.speed < 0) {
      this.speed = 0;
    } else {
      this.speed -= 5;
    }
  }

  openTrunk() {
    if (!this.acceleration) {
      if (this.speed === 0) {
      this.isTrunkOpen = true;
      }
    }
  }
    

  closeTrunk() {
    if (!this.acceleration) {
      this.isTrunkOpen = false;
    }
      
  }
}

class RaceCar extends Car {
  acceleration;

  constructor(carDetails) {
    super(carDetails);
    this.acceleration = carDetails.acceleration;
  }
}

const car1 = new Car({brand: 'Toyota', model: 'Corolla', speed: 0, isTrunkOpen: false});
const car2 = new Car({brand: 'BMW', model: 'E92', speed: 0, isTrunkOpen: false});
const car3 = new Car({brand: 'Porsche', model: '911', speed: 0, isTrunkOpen: false});

const car4 = new RaceCar({brand: 'McLaren', model: 'F1', speed: 0, acceleration: 20});

car1.openTrunk();

car1.go();
car2.go();
car3.go();
car4.go();
car4.go();


car1.displayInfo();
car2.displayInfo();
car3.displayInfo();
car4.displayInfo();