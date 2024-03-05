<searchbar>
    <input placeholder="Search your network...">
    <option-box>
        <option-header>Advanced Options</option-header>
        <option-block>
            <label>Company Type</label>
            <select>
                <option>Nonprofit</option>
                <option>LLC</option>
                <option>401K Invest</option>
            </select>
        </option-block>
        <option-block>
            <label>Sort by</label>
            <select>
                <option>Prior Contribution (Desc.)</option>
                <option>Prior Contribution (Asc.)</option>
                <option>Name (Desc.)</option>
                <option>Name (Asc.)</option>
                <option>Last Contribution Date (Desc.)</option>
                <option>Last Contribution Date (Asc.)</option>
                <option>Employee Count (Desc.)</option>
                <option>Employee Count (Asc.)</option>
            </select>
        </option-block>
    </option-box>
</searchbar>

<style>
    searchbar {
        display: inline-flex;
        flex-direction: column;
        align-items: center;

        width: 100%;
        max-width: 50%;
    }

    option-header {
        display: block;
        font-size: 1.3em;
        opacity: 0.6;
        font-weight: bold;
        margin-bottom: 6px;
    }

    option-box {
        display: inline-block;
        background-color: #F8F8F8;
        border-radius: 8px;

        border-top-left-radius: 0px;
        border-top-right-radius: 0px;
        border: 2px solid #00000066;
        border-top: none;

        padding: 8px;
        width: 50%;
    }

    option-block {
        display: block;
    }

    input {
        width: 100%;

        height: 32px;

        /* Fix vertical alignment */
        line-height: 32px;

        font-size: 16px;

        border-radius: 128px;
        
        /* Disable highlighting when focused */
        outline: none;

        padding-left: 16px;
        padding-right: 16px;

        padding-top: 4px;
        padding-bottom: 4px;

        border: 2px solid #00000066;
    }
</style>
