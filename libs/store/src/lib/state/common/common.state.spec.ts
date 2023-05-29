import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { provideAutoSpy, Spy } from 'jest-auto-spies';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
import { AvailablePlaceService } from '@weather-forecast/apis';
import { CommonStateService } from './common.state';
import { PlaceDetails } from '@weather-forecast/models';
import { GetUsStateCapitals } from './common.actions';


const mockUsStateCapitalData = [
  {
    state: "fakeState1",
    capital: "fakeCapital1",
    longitude: "32.377716",
    latitude: "-86.300568",
  },
  {
    state: "fakeState2",
    capital: "fakeCapital2",
    longitude: "32.377716",
    latitude: "-86.300568",
  }
];

describe('WeatherState : ', () => {
  let store: Store;
  let availablePlaceServiceSpy: Spy<AvailablePlaceService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([CommonStateService]), NgxsDispatchPluginModule.forRoot()],
      providers: [
        provideAutoSpy(AvailablePlaceService, {
          methodsToSpyOn: ['getUsStateCapitals'],
        }),
      ],
    }).compileComponents();

    store = TestBed.inject(Store);
    availablePlaceServiceSpy = TestBed.inject(AvailablePlaceService) as Spy<AvailablePlaceService>;

    // fake return the data
    availablePlaceServiceSpy.getUsStateCapitals.nextWith(mockUsStateCapitalData as PlaceDetails[]);
  });

  it('CommonState : should be defined', () => {
    // act
    const storeSnapshot = store.selectSnapshot(CommonStateService);

    // assert
    expect(storeSnapshot).toBeTruthy();
  });

  describe('Actions', () => {
    it('CommonState : getUsStateCapitals should call the getUsStateCapitals api service', () => {
      // act 
      store.dispatch(new GetUsStateCapitals());

      // assert
      expect(availablePlaceServiceSpy.getUsStateCapitals).toHaveBeenCalled();
    });

    it('CommonState : getUsStateCapitals should set the state', () => {
      // arrange
      const expectedObject = [
        {
          state: "fakeState1",
          capital: "fakeCapital1",
          longitude: "32.377716",
          latitude: "-86.300568",
        },
        {
          state: "fakeState2",
          capital: "fakeCapital2",
          longitude: "32.377716",
          latitude: "-86.300568",
        }
      ];
      // act 
      store.dispatch(new GetUsStateCapitals());

      // assert
      const storeSnapshot = store.selectSnapshot(CommonStateService);
      expect(storeSnapshot.getUsStateCapitals).toMatchObject(expectedObject);
    });
  });
});