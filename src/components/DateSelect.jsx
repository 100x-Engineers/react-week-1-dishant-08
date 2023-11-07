export default function DateSelector() {
  return (
    <>
      <div className="flex items-center self-stretch gap-3">
        <fieldset className=" flex group py-4 px-3 justify-between items-center self-stretch border border-neutral-500 rounded focus-within:border-twitter-blue ">
          <legend className=" text-neutral-500 font-Inter text-0.75 font-medium px-1 group-focus-within:text-twitter-blue ">
            Month
          </legend>
          <select className="bg-neutral-1000 focus:outline-none text-neutral-50  font-Inter text-[1.25rem] font-normal   ">
            <option value className="hidden" />
            <option value={1}>January</option>
            <option value={2}>February</option>
            <option value={3}>March</option>
            <option value={4}>April</option>
            <option value={5}>May</option>
            <option value={6}>June</option>
            <option value={7}>July</option>
            <option value={8}>August</option>
            <option value={9}>September</option>
            <option value={10}>October</option>
            <option value={11}>November</option>
            <option value={12}>December</option>
          </select>
        </fieldset>
        <fieldset className=" flex group py-4 px-3 justify-between items-center self-stretch border border-neutral-500 rounded focus-within:border-twitter-blue ">
          <legend className=" text-neutral-500 font-Inter text-0.75 font-medium px-1 group-focus-within:text-twitter-blue ">
            Day
          </legend>
          <select className="bg-neutral-1000 focus:outline-none text-neutral-50  font-Inter text-[1.25rem] font-normal   ">
            <option value className="hidden" />
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
            <option>13</option>
            <option>14</option>
            <option>15</option>
            <option>16</option>
            <option>17</option>
            <option>18</option>
            <option>19</option>
            <option>20</option>
            <option>21</option>
            <option>22</option>
            <option>23</option>
            <option>24</option>
            <option>25</option>
            <option>26</option>
            <option>27</option>
            <option>28</option>
            <option>29</option>
            <option>30</option>
            <option>31</option>
          </select>
        </fieldset>
        <fieldset className=" flex group py-4 px-3 justify-between items-center self-stretch border border-neutral-500 rounded focus-within:border-twitter-blue ">
          <legend className=" text-neutral-500 font-Inter text-0.75 font-medium px-1 group-focus-within:text-twitter-blue ">
            Year
          </legend>
          <select className=" focus:outline-none text-neutral-50 bg-neutral-1000  font-Inter text-[1.25rem] font-normal   ">
            <option value className="hidden" />
            <option>2023</option>
            <option>2022</option>
            <option>2021</option>
            <option>2020</option>
            <option>2019</option>
            <option>2018</option>
            <option>2017</option>
            <option>2016</option>
            <option>2015</option>
            <option>2014</option>
            <option>2013</option>
            <option>2012</option>
            <option>2011</option>
          </select>
        </fieldset>
      </div>
    </>
  );
}
